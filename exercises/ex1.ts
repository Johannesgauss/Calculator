abstract class Pessoa {
    protected nome: string;
    protected telefone: string;

    public constructor(nome: string, telefone: string) {
        this.nome = nome;
        this.telefone = telefone;
    }
}

class Fisica extends Pessoa {
    private cpf: string;
    private rg: string;
    private dataNascimento: Date;

    public constructor(nome: string, telefone: string, cpf: string, rg: string, dataNascimento: Date) {
        super(nome, telefone);
        this.cpf = cpf;
        this.rg = rg;
        this.dataNascimento = dataNascimento;
    }

    public getIdade(): number {
        const hoje = new Date();
        const anoAtual = hoje.getFullYear();
        const mesAtual = hoje.getMonth();
        const diaAtual = hoje.getDate();

        const anoNascimento = this.dataNascimento.getFullYear();
        const mesNascimento = this.dataNascimento.getMonth();
        const diaNascimento = this.dataNascimento.getDate();

        let idade = anoAtual - anoNascimento;

        if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
            idade--;
        }

        return idade;
    }
    public toString(): string {
        return `Pessoa Física - Nome: ${this.nome}, Telefone: ${this.telefone}, CPF: ${this.cpf}, RG: ${this.rg}, Data de Nascimento: ${this.dataNascimento.toLocaleDateString('pt-BR')}`;
    }
}

class Juridica extends Pessoa {
    private cnpj: string;
    private inscricaoEstadual: string;

    public constructor(nome: string, telefone: string, cnpj: string, inscricaoEstadual: string) {
        super(nome, telefone);
        this.cnpj = cnpj;
        this.inscricaoEstadual = inscricaoEstadual;
    }
    public toString(): string {
        return `Pessoa Jurídica - Nome: ${this.nome}, Telefone: ${this.telefone}, CNPJ: ${this.cnpj}, Inscrição Estadual: ${this.inscricaoEstadual}`;
}
}
