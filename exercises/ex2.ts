interface IOperacaoMatematica
{
    calcular(a: number, b: number): number
}

class Soma implements IOperacaoMatematica
{
    calcular(a: number, b: number): number
    {
        return a + b;
    }    
}


class Subtracao implements IOperacaoMatematica
{
    calcular(a: number, b: number): number
    {
        return a - b;
    }    
}
class Multiplicacao implements IOperacaoMatematica
{
    calcular(a: number, b: number): number
    {
        return a * b;
    }    
}

class Divisao implements IOperacaoMatematica
{
    calcular(a: number, b: number): number
    {
        if (b != 0) {
            return a / b;
        } else {
            throw new Error("Divisão por zero não existe!");
        }
    }    
}
