
import React from 'react';
import { Sun, Plug, DollarSign, Clock, Leaf } from 'lucide-react';
import { Button } from '../ui/button';
import { CalculationResults } from '../../utils/proposalCalculations';

interface CalculationResultsProps {
  calculations: CalculationResults | null;
  onCalculate: () => void;
}

const CalculationResultsDisplay: React.FC<CalculationResultsProps> = ({ calculations, onCalculate }) => {
  return (
    <div>
      <Button 
        onClick={onCalculate}
        variant="outline"
        className="w-full mb-6 border-flip-blue-500 text-flip-blue-500 hover:bg-flip-blue-50"
      >
        Calcular Valores
      </Button>

      {calculations && (
        <div className="space-y-4">
          <div className="flex items-center p-3 bg-flip-blue-50 rounded-lg">
            <Sun className="h-5 w-5 text-flip-blue-500 mr-3" />
            <div>
              <p className="font-medium text-flip-gray-900">Potência do Sistema</p>
              <p className="text-flip-gray-600">{calculations.systemPower} kWp</p>
            </div>
          </div>

          <div className="flex items-center p-3 bg-flip-blue-50 rounded-lg">
            <Plug className="h-5 w-5 text-flip-blue-500 mr-3" />
            <div>
              <p className="font-medium text-flip-gray-900">Número de Placas</p>
              <p className="text-flip-gray-600">{calculations.numberOfPanels} unidades</p>
            </div>
          </div>

          <div className="flex items-center p-3 bg-flip-blue-50 rounded-lg">
            <DollarSign className="h-5 w-5 text-flip-blue-500 mr-3" />
            <div>
              <p className="font-medium text-flip-gray-900">Economia Anual</p>
              <p className="text-flip-gray-600">R$ {calculations.annualSavings}</p>
            </div>
          </div>

          <div className="flex items-center p-3 bg-flip-blue-50 rounded-lg">
            <Clock className="h-5 w-5 text-flip-blue-500 mr-3" />
            <div>
              <p className="font-medium text-flip-gray-900">Payback</p>
              <p className="text-flip-gray-600">{calculations.payback} anos</p>
            </div>
          </div>

          <div className="flex items-center p-3 bg-flip-blue-50 rounded-lg">
            <Leaf className="h-5 w-5 text-flip-blue-500 mr-3" />
            <div>
              <p className="font-medium text-flip-gray-900">Redução CO₂</p>
              <p className="text-flip-gray-600">{calculations.co2Reduction} ton/ano</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculationResultsDisplay;
