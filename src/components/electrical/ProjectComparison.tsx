
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { GitCompare, TrendingUp, DollarSign, Clock } from 'lucide-react';

const ProjectComparison = () => {
  const [project1, setProject1] = useState('solar-micro');
  const [project2, setProject2] = useState('substation-aerial');

  const projectData = {
    'solar-micro': {
      name: 'Microgeração Solar',
      icon: '🔆',
      investment: 'R$ 45.000',
      payback: '4-6 anos',
      complexity: 'Baixa',
      maintenance: 'Mínima',
      pros: ['Redução na conta de luz', 'Baixa manutenção', 'Incentivos fiscais', 'Sustentabilidade'],
      cons: ['Dependente do clima', 'Investimento inicial alto', 'Payback longo', 'Área necessária']
    },
    'solar-mini': {
      name: 'Minigeração Solar',
      icon: '☀️',
      investment: 'R$ 300.000+',
      payback: '3-5 anos',
      complexity: 'Média',
      maintenance: 'Baixa',
      pros: ['Maior economia', 'Venda de energia', 'ROI atrativo', 'Projetos comerciais'],
      cons: ['Alto investimento', 'Complexidade regulatória', 'Área extensa', 'Aprovações']
    },
    'substation-aerial': {
      name: 'Subestação Aérea',
      icon: '⚡',
      investment: 'R$ 150.000+',
      payback: 'Não aplicável',
      complexity: 'Alta',
      maintenance: 'Média',
      pros: ['Menor custo', 'Instalação rápida', 'Flexibilidade', 'Manutenção acessível'],
      cons: ['Exposição climática', 'Área necessária', 'Segurança', 'Ruído']
    },
    'substation-enclosed': {
      name: 'Subestação Abrigada',
      icon: '🏢',
      investment: 'R$ 250.000+',
      payback: 'Não aplicável',
      complexity: 'Alta',
      maintenance: 'Baixa',
      pros: ['Proteção total', 'Menor área', 'Segurança', 'Vida útil longa'],
      cons: ['Alto custo', 'Complexidade construtiva', 'Ventilação', 'Acesso restrito']
    }
  };

  const data1 = projectData[project1 as keyof typeof projectData];
  const data2 = projectData[project2 as keyof typeof projectData];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <GitCompare className="h-5 w-5 mr-2 text-flip-blue-500" />
          Comparação de Projetos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Projeto 1</label>
            <Select value={project1} onValueChange={setProject1}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solar-micro">🔆 Microgeração Solar</SelectItem>
                <SelectItem value="solar-mini">☀️ Minigeração Solar</SelectItem>
                <SelectItem value="substation-aerial">⚡ Subestação Aérea</SelectItem>
                <SelectItem value="substation-enclosed">🏢 Subestação Abrigada</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Projeto 2</label>
            <Select value={project2} onValueChange={setProject2}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solar-micro">🔆 Microgeração Solar</SelectItem>
                <SelectItem value="solar-mini">☀️ Minigeração Solar</SelectItem>
                <SelectItem value="substation-aerial">⚡ Subestação Aérea</SelectItem>
                <SelectItem value="substation-enclosed">🏢 Subestação Abrigada</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Project 1 */}
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl mb-2">{data1.icon}</div>
              <h3 className="text-lg font-semibold">{data1.name}</h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  Investimento
                </span>
                <Badge variant="outline">{data1.investment}</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Payback
                </span>
                <Badge variant="outline">{data1.payback}</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Complexidade
                </span>
                <Badge variant={data1.complexity === 'Baixa' ? 'default' : data1.complexity === 'Média' ? 'secondary' : 'destructive'}>
                  {data1.complexity}
                </Badge>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium text-green-700 mb-2">✅ Vantagens</h4>
              <ul className="space-y-1">
                {data1.pros.map((pro, index) => (
                  <li key={index} className="text-sm text-gray-600">• {pro}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-red-700 mb-2">⚠️ Desvantagens</h4>
              <ul className="space-y-1">
                {data1.cons.map((con, index) => (
                  <li key={index} className="text-sm text-gray-600">• {con}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Project 2 */}
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl mb-2">{data2.icon}</div>
              <h3 className="text-lg font-semibold">{data2.name}</h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  Investimento
                </span>
                <Badge variant="outline">{data2.investment}</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Payback
                </span>
                <Badge variant="outline">{data2.payback}</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Complexidade
                </span>
                <Badge variant={data2.complexity === 'Baixa' ? 'default' : data2.complexity === 'Média' ? 'secondary' : 'destructive'}>
                  {data2.complexity}
                </Badge>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium text-green-700 mb-2">✅ Vantagens</h4>
              <ul className="space-y-1">
                {data2.pros.map((pro, index) => (
                  <li key={index} className="text-sm text-gray-600">• {pro}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-red-700 mb-2">⚠️ Desvantagens</h4>
              <ul className="space-y-1">
                {data2.cons.map((con, index) => (
                  <li key={index} className="text-sm text-gray-600">• {con}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectComparison;
