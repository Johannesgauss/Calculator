import chalk from 'chalk'
import inquirer from 'inquirer'
import Calculator from './Calculator.ts'

const calculator = new Calculator(undefined, "", undefined);

async function main() {
    try {
        const menu = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'O que desejas fazer?',
                choices: [
                    'Digitar um dígito',
                    'Definir operador',
                    'Calcular resultado',
                    'Sair'
                ],
            },
        ]);

        switch (menu.action) {
            case 'Digitar um dígito':
                const numAnswer = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'digit',
                        message: 'Digite um único dígito (0-9):',
                        validate: (value) => {
                            const num = parseInt(value);
                            if (isNaN(num) || num < 0 || num > 9) {
                                return 'Por favor, insira apenas um dígito válido entre 0 e 9.';
                            }
                            return true;
                        }
                    }
                ]);
                calculator.appendNumber(parseInt(numAnswer.digit));
                break;

            case 'Definir operador':
                const opAnswer = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'operator',
                        message: 'Escolha a operação:',
                        choices: ['+', '-', '*', '/']
                    }
                ]);
                calculator.setOperator(opAnswer.operator);
                break;

            case 'Calcular resultado':
                try {
                    const resultado = calculator.calculate();
                    console.log(chalk.green(`Resultado: ${resultado}`));
                } catch (error: any) {
                    console.log(chalk.red(error.message));
                }
                break;

            case 'Sair':
                process.exit(0);
        }

        main();

    } catch (err) {
        console.log(err);
    }
}

main();
