import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Calculator, Zap, MapPin, User } from 'lucide-react';
import { EntradaDados } from '../../utils/solar/types';
import { EntradaDadosModule } from '../../utils/solar/modulo1-entrada-dados';
import { SistemaModularSolar } from '../../utils/solar/sistema-modular';
import { useToast } from '../../hooks/use-toast';

const SolarProposalForm = () => {
  const { toast } = useToast();
  const [dadosEntrada, setDadosEntrada] = useState<EntradaDados>(
    EntradaDadosModule.criarDadosPadrao()
  );
  const [resultado, setResultado] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (section: keyof EntradaDados, field: string, value: any) => {
    setDadosEntrada(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleCalcular = () => {
    setLoading(true);
    try {
      const resultadoCalculo = SistemaModularSolar.calcularProposta(dadosEntrada);
      
      if (!resultadoCalculo.valido) {
        toast({
          title: "Erro na validação",
          description: resultadoCalculo.erros.join(', '),
          variant: "destructive"
        });
        return;
      }

      setResultado(resultadoCalculo);
      toast({
        title: "Cálculo realizado com sucesso!",
        description: "Proposta solar gerada."
      });
    } catch (error) {
      toast({
        title: "Erro no cálculo",
        description: "Ocorreu um erro ao calcular a proposta.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Gerador de Propostas Solares
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="local" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="local" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Local
              </TabsTrigger>
              <TabsTrigger value="cliente" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Cliente
              </TabsTrigger>
              <TabsTrigger value="equipamentos" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Equipamentos
              </TabsTrigger>
              <TabsTrigger value="calculo" className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Cálculo
              </TabsTrigger>
            </TabsList>

            <TabsContent value="local" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input
                    id="cidade"
                    value={dadosEntrada.local.cidade}
                    onChange={(e) => handleInputChange('local', 'cidade', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estado">Estado</Label>
                  <Select
                    value={dadosEntrada.local.estado}
                    onValueChange={(value) => handleInputChange('local', 'estado', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SP">São Paulo</SelectItem>
                      <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                      <SelectItem value="MG">Minas Gerais</SelectItem>
                      <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                      <SelectItem value="PR">Paraná</SelectItem>
                      <SelectItem value="SC">Santa Catarina</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inclinacao">Inclinação (°)</Label>
                  <Input
                    id="inclinacao"
                    type="number"
                    value={dadosEntrada.local.inclinacao}
                    onChange={(e) => handleInputChange('local', 'inclinacao', Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orientacao">Orientação/Azimute (°)</Label>
                  <Input
                    id="orientacao"
                    type="number"
                    value={dadosEntrada.local.orientacao}
                    onChange={(e) => handleInputChange('local', 'orientacao', Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="irradiacao">Irradiação Média (kWh/m²/dia)</Label>
                  <Input
                    id="irradiacao"
                    type="number"
                    step="0.1"
                    value={dadosEntrada.local.irradiacaoMedia}
                    onChange={(e) => handleInputChange('local', 'irradiacaoMedia', Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipoInstalacao">Tipo de Instalação</Label>
                  <Select
                    value={dadosEntrada.local.tipoInstalacao}
                    onValueChange={(value) => handleInputChange('local', 'tipoInstalacao', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="telhado">Telhado</SelectItem>
                      <SelectItem value="solo">Solo</SelectItem>
                      <SelectItem value="carport">Carport</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="cliente" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nomeCliente">Nome do Cliente</Label>
                  <Input
                    id="nomeCliente"
                    value={dadosEntrada.cliente.nome}
                    onChange={(e) => handleInputChange('cliente', 'nome', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="consumo">Consumo Médio Mensal (kWh)</Label>
                  <Input
                    id="consumo"
                    type="number"
                    value={dadosEntrada.cliente.consumoMedioMensal}
                    onChange={(e) => handleInputChange('cliente', 'consumoMedioMensal', Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipoCliente">Tipo de Cliente</Label>
                  <Select
                    value={dadosEntrada.cliente.tipoCliente}
                    onValueChange={(value) => handleInputChange('cliente', 'tipoCliente', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residencial">Residencial</SelectItem>
                      <SelectItem value="comercial">Comercial</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                      <SelectItem value="rural">Rural</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="objetivo">Objetivo do Cliente</Label>
                  <Select
                    value={dadosEntrada.cliente.objetivoCliente}
                    onValueChange={(value) => handleInputChange('cliente', 'objetivoCliente', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zerar_conta">Zerar a conta</SelectItem>
                      <SelectItem value="gerar_kwh">Gerar X kWh/mês</SelectItem>
                      <SelectItem value="definir_potencia">Definir potência (kWp)</SelectItem>
                      <SelectItem value="usar_modulos">Usar X módulos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {dadosEntrada.cliente.objetivoCliente !== 'zerar_conta' && (
                  <div className="space-y-2">
                    <Label htmlFor="valorObjetivo">Valor do Objetivo</Label>
                    <Input
                      id="valorObjetivo"
                      type="number"
                      value={dadosEntrada.cliente.valorObjetivo || ''}
                      onChange={(e) => handleInputChange('cliente', 'valorObjetivo', Number(e.target.value))}
                      placeholder={
                        dadosEntrada.cliente.objetivoCliente === 'gerar_kwh' ? 'kWh/mês' :
                        dadosEntrada.cliente.objetivoCliente === 'definir_potencia' ? 'kWp' :
                        'Número de módulos'
                      }
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="perfilCompensacao">Perfil de Compensação (%)</Label>
                  <Input
                    id="perfilCompensacao"
                    type="number"
                    value={dadosEntrada.cliente.perfilCompensacao}
                    onChange={(e) => handleInputChange('cliente', 'perfilCompensacao', Number(e.target.value))}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="equipamentos" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Módulo Solar</h3>
                  <div className="space-y-2">
                    <Label htmlFor="marcaModulo">Marca</Label>
                    <Input
                      id="marcaModulo"
                      value={dadosEntrada.equipamentos.modulo.marca}
                      onChange={(e) => handleInputChange('equipamentos', 'modulo', {
                        ...dadosEntrada.equipamentos.modulo,
                        marca: e.target.value
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="potenciaModulo">Potência (W)</Label>
                    <Input
                      id="potenciaModulo"
                      type="number"
                      value={dadosEntrada.equipamentos.modulo.potencia}
                      onChange={(e) => handleInputChange('equipamentos', 'modulo', {
                        ...dadosEntrada.equipamentos.modulo,
                        potencia: Number(e.target.value)
                      })}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Inversor</h3>
                  <div className="space-y-2">
                    <Label htmlFor="marcaInversor">Marca</Label>
                    <Input
                      id="marcaInversor"
                      value={dadosEntrada.equipamentos.inversor.marca}
                      onChange={(e) => handleInputChange('equipamentos', 'inversor', {
                        ...dadosEntrada.equipamentos.inversor,
                        marca: e.target.value
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="potenciaInversor">Potência Nominal (W)</Label>
                    <Input
                      id="potenciaInversor"
                      type="number"
                      value={dadosEntrada.equipamentos.inversor.potenciaNominal}
                      onChange={(e) => handleInputChange('equipamentos', 'inversor', {
                        ...dadosEntrada.equipamentos.inversor,
                        potenciaNominal: Number(e.target.value)
                      })}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="calculo" className="space-y-4">
              <Button 
                onClick={handleCalcular} 
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Calculando...' : 'Calcular Proposta Solar'}
              </Button>

              {resultado && (
                <Card>
                  <CardHeader>
                    <CardTitle>Resultado da Proposta</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">Número de Módulos</p>
                        <p className="text-2xl font-bold">{resultado.resultadoObjetivo.numeroModulos}</p>
                      </div>
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">Potência Instalada</p>
                        <p className="text-2xl font-bold">{resultado.resultadoObjetivo.potenciaInstalada.toFixed(2)} kWp</p>
                      </div>
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">Geração Mensal</p>
                        <p className="text-2xl font-bold">{resultado.resultadoObjetivo.geracaoEstimada.toFixed(0)} kWh</p>
                      </div>
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">Compensação</p>
                        <p className="text-2xl font-bold">{resultado.resultadoObjetivo.percentualCompensacao.toFixed(0)}%</p>
                      </div>
                    </div>

                    {resultado.calculosAdicionais && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div className="bg-muted p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground">Economia Mensal</p>
                          <p className="text-xl font-bold">R$ {resultado.calculosAdicionais.economiaMensal.toFixed(2)}</p>
                        </div>
                        <div className="bg-muted p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground">Payback</p>
                          <p className="text-xl font-bold">{resultado.calculosAdicionais.payback.toFixed(1)} anos</p>
                        </div>
                        <div className="bg-muted p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground">Área Ocupada</p>
                          <p className="text-xl font-bold">{resultado.calculosAdicionais.areaOcupada.toFixed(1)} m²</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SolarProposalForm;