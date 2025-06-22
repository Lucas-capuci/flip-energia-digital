
import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { FileText, Download, Zap, DollarSign, Clock, MapPin } from 'lucide-react';
import { SolarCalculationResults, SubstationCalculationResults } from '../../utils/electricalCalculations';

interface ProjectResultsProps {
  calculations: SolarCalculationResults | SubstationCalculationResults | null;
  projectType: string;
  onExportPDF: () => void;
}

const ProjectResults: React.FC<ProjectResultsProps> = ({ calculations, projectType, onExportPDF }) => {
  if (!calculations) {
    return (
      <div className="text-center py-12">
        <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum cálculo realizado</h3>
        <p className="text-gray-500">Preencha os dados e clique em "Calcular Projeto" para ver os resultados.</p>
      </div>
    );
  }

  const isSolarProject = projectType.startsWith('solar');

  const renderSolarResults = (results: SolarCalculationResults) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Dimensionamento */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg">
            <Zap className="h-5 w-5 mr-2 text-flip-blue-500" />
            Dimensionamento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-sm text-gray-600">Potência do Sistema</p>
            <p className="text-2xl font-bold text-flip-blue-600">{results.systemPower} kWp</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Quantidade de Módulos</p>
            <p className="text-lg font-semibold">{results.numberOfModules} unidades</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Tipo de Módulo</p>
            <Badge variant="outline">{results.moduleType}</Badge>
          </div>
          <div>
            <p className="text-sm text-gray-600">Inversores</p>
            <p className="text-lg font-semibold">{results.inverterQuantity}x {results.inverterType}</p>
          </div>
        </CardContent>
      </Card>

      {/* Área e Geração */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg">
            <MapPin className="h-5 w-5 mr-2 text-green-500" />
            Área e Geração
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-sm text-gray-600">Área Total</p>
            <p className="text-2xl font-bold text-green-600">{results.estimatedArea} m²</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Geração Anual</p>
            <p className="text-lg font-semibold">{results.annualGeneration} kWh</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">CO₂ Evitado</p>
            <p className="text-lg font-semibold text-green-600">{results.co2Avoided} kg/ano</p>
          </div>
        </CardContent>
      </Card>

      {/* Análise Financeira */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg">
            <DollarSign className="h-5 w-5 mr-2 text-yellow-500" />
            Análise Financeira
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-sm text-gray-600">Investimento Total</p>
            <p className="text-2xl font-bold text-yellow-600">R$ {results.totalCost}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Custo por kWp</p>
            <p className="text-lg font-semibold">R$ {results.costPerKwp}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Economia Mensal</p>
            <p className="text-lg font-semibold text-green-600">R$ {results.monthlySavings}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Payback</p>
            <Badge variant="default" className="bg-yellow-500">
              {results.payback} anos
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSubstationResults = (results: SubstationCalculationResults) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Dimensionamento Elétrico */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg">
            <Zap className="h-5 w-5 mr-2 text-flip-blue-500" />
            Dimensionamento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-sm text-gray-600">Transformador</p>
            <p className="text-2xl font-bold text-flip-blue-600">{results.recommendedTransformer}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Corrente MT</p>
            <p className="text-lg font-semibold">{results.currentMT} A</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Corrente BT</p>
            <p className="text-lg font-semibold">{results.currentBT} A</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Área Estimada</p>
            <p className="text-lg font-semibold">{results.estimatedArea} m²</p>
          </div>
        </CardContent>
      </Card>

      {/* Equipamentos */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg">
            <MapPin className="h-5 w-5 mr-2 text-green-500" />
            Equipamentos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {results.equipmentList.map((equipment, index) => (
            <div key={index} className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm">{equipment}</span>
            </div>
          ))}
          <div className="mt-3">
            <p className="text-sm text-gray-600">Resistência de Aterramento</p>
            <Badge variant="outline">{results.groundingResistance} Ω</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Custos e Prazo */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg">
            <DollarSign className="h-5 w-5 mr-2 text-yellow-500" />
            Custos e Prazo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-sm text-gray-600">Custo Total</p>
            <p className="text-2xl font-bold text-yellow-600">R$ {results.totalCost}</p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <p className="text-gray-500">Materiais</p>
              <p className="font-semibold">R$ {results.materialsCost}</p>
            </div>
            <div>
              <p className="text-gray-500">M.O.</p>
              <p className="font-semibold">R$ {results.laborCost}</p>
            </div>
            <div>
              <p className="text-gray-500">Projeto</p>
              <p className="font-semibold">R$ {results.projectCost}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600">Tempo de Execução</p>
            <Badge variant="default" className="bg-blue-500">
              <Clock className="h-3 w-3 mr-1" />
              {results.executionTime}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-flip-gray-900">Resultados do Projeto</h2>
          <p className="text-gray-600">
            {isSolarProject ? 'Sistema Fotovoltaico' : 'Subestação Elétrica'} - 
            Cálculos técnicos e financeiros
          </p>
        </div>
        <Button 
          onClick={onExportPDF}
          className="bg-flip-blue-500 hover:bg-flip-blue-600 text-white"
        >
          <Download className="h-4 w-4 mr-2" />
          Exportar PDF
        </Button>
      </div>

      {/* Resultados */}
      {isSolarProject 
        ? renderSolarResults(calculations as SolarCalculationResults)
        : renderSubstationResults(calculations as SubstationCalculationResults)
      }

      {/* Observações */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">📋 Observações Importantes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {isSolarProject ? (
              <>
                <div>
                  <h4 className="font-semibold mb-2">Considerações Técnicas:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Valores baseados em condições ideais de instalação</li>
                    <li>• Geração pode variar conforme clima e manutenção</li>
                    <li>• Necessário projeto específico para conexão</li>
                    <li>• Considerar sombreamentos locais</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Aspectos Financeiros:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Payback calculado sem considerar inflação</li>
                    <li>• Economia real pode variar conforme tarifa</li>
                    <li>• Não inclui custos de O&M</li>
                    <li>• Financiamento pode alterar viabilidade</li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h4 className="font-semibold mb-2">Considerações Técnicas:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Dimensionamento baseado em normas técnicas</li>
                    <li>• Verificar adequação às normas locais</li>
                    <li>• Considerar expansões futuras</li>
                    <li>• Aterramento conforme NBR 5410</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Aspectos Construtivos:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Cronograma pode variar conforme clima</li>
                    <li>• Necessário projeto aprovado na concessionária</li>
                    <li>• Considerar licenças ambientais se aplicável</li>
                    <li>• Custos podem variar conforme região</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectResults;
