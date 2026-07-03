export class Calculator
{
    private currentInput: number;
    private operator: string;
    private previousInput: number;

    public constructor(currentInput: number, operator: string, previousInput: number)
    {
        this.currentInput = currentInput
        this.operator = operator;
        this.previousInput = previousInput;
    }

    public appendNumber(number: number) : void
    {
        if (this.currentInput == undefined) {
            this.currentInput = number;
        } else {
            this.currentInput = this.currentInput * 10 + number;
        }
    }

    public setOperator(operator: string) : void
    {
        this.previousInput = this.currentInput;
        this.currentInput = undefined;
        this.operator = operator;
    }

    public calculate() : number
    {
        switch (this.operator) {
        case ('+'):
            return this.previousInput + this.currentInput;
        case ('-'):
            return this.previousInput - this.currentInput;
        case ('*'):
            return this.previousInput * this.currentInput;
        case ('/'):
            if (this.currentInput != 0) {
                return this.previousInput / this.currentInput;
            } else {
                throw new Error("Não existe divisão por zero!")
            }
        }
    }
}
