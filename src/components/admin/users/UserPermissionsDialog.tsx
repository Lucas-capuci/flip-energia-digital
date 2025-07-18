import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

interface SystemUser {
  id: string;
  username: string;
  full_name: string;
}

interface SystemModule {
  id: string;
  module_key: string;
  module_name: string;
  description?: string;
}

interface UserPermission {
  module_id: string;
  can_view: boolean;
  can_create: boolean;
  can_edit: boolean;
  can_delete: boolean;
}

interface UserPermissionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: SystemUser | null;
}

export const UserPermissionsDialog = ({ open, onOpenChange, user }: UserPermissionsDialogProps) => {
  const { refetchPermissions } = useAuth();
  const [loading, setLoading] = useState(false);
  const [modules, setModules] = useState<SystemModule[]>([]);
  const [permissions, setPermissions] = useState<{ [key: string]: UserPermission }>({});

  const fetchData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Buscar módulos
      const { data: modulesData, error: modulesError } = await supabase
        .from('system_modules')
        .select('*')
        .eq('is_active', true)
        .order('module_name');

      if (modulesError) throw modulesError;

      // Buscar permissões do usuário
      const { data: permissionsData, error: permissionsError } = await supabase
        .from('user_permissions')
        .select('*')
        .eq('user_id', user.id);

      if (permissionsError) throw permissionsError;

      setModules(modulesData || []);

      // Organizar permissões por module_id
      const permissionsMap: { [key: string]: UserPermission } = {};
      modulesData?.forEach(module => {
        const existingPermission = permissionsData?.find(p => p.module_id === module.id);
        permissionsMap[module.id] = existingPermission || {
          module_id: module.id,
          can_view: false,
          can_create: false,
          can_edit: false,
          can_delete: false,
        };
      });

      setPermissions(permissionsMap);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      toast.error('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && user) {
      fetchData();
    }
  }, [open, user]);

  const handlePermissionChange = (moduleId: string, field: keyof UserPermission, value: boolean) => {
    setPermissions(prev => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Deletar permissões existentes
      await supabase
        .from('user_permissions')
        .delete()
        .eq('user_id', user.id);

      // Inserir novas permissões
      const permissionsToInsert = Object.values(permissions)
        .filter(p => p.can_view || p.can_create || p.can_edit || p.can_delete)
        .map(p => ({
          user_id: user.id,
          module_id: p.module_id,
          can_view: p.can_view,
          can_create: p.can_create,
          can_edit: p.can_edit,
          can_delete: p.can_delete,
        }));

      if (permissionsToInsert.length > 0) {
        const { error } = await supabase
          .from('user_permissions')
          .insert(permissionsToInsert);

        if (error) throw error;
      }

      toast.success('Permissões atualizadas com sucesso');
      await refetchPermissions();
      onOpenChange(false);
    } catch (error) {
      console.error('Erro ao salvar permissões:', error);
      toast.error('Erro ao salvar permissões');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Permissões do Usuário</DialogTitle>
          {user && (
            <p className="text-sm text-muted-foreground">
              Configurando permissões para: {user.full_name} (@{user.username})
            </p>
          )}
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {modules.map((module) => {
              const permission = permissions[module.id];
              return (
                <Card key={module.id}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{module.module_name}</CardTitle>
                    {module.description && (
                      <CardDescription>{module.description}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`${module.id}-view`}
                          checked={permission?.can_view || false}
                          onCheckedChange={(checked) => 
                            handlePermissionChange(module.id, 'can_view', checked)
                          }
                        />
                        <Label htmlFor={`${module.id}-view`}>Visualizar</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`${module.id}-create`}
                          checked={permission?.can_create || false}
                          onCheckedChange={(checked) => 
                            handlePermissionChange(module.id, 'can_create', checked)
                          }
                        />
                        <Label htmlFor={`${module.id}-create`}>Criar</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`${module.id}-edit`}
                          checked={permission?.can_edit || false}
                          onCheckedChange={(checked) => 
                            handlePermissionChange(module.id, 'can_edit', checked)
                          }
                        />
                        <Label htmlFor={`${module.id}-edit`}>Editar</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`${module.id}-delete`}
                          checked={permission?.can_delete || false}
                          onCheckedChange={(checked) => 
                            handlePermissionChange(module.id, 'can_delete', checked)
                          }
                        />
                        <Label htmlFor={`${module.id}-delete`}>Excluir</Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button onClick={handleSave} disabled={loading}>
                {loading ? 'Salvando...' : 'Salvar Permissões'}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};