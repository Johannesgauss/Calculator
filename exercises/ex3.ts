class UnidadeFederativa {
  static readonly BAHIA = new UnidadeFederativa("Bahia", "BA");
  static readonly SAO_PAULO = new UnidadeFederativa("Sao Paulo", "SP");
  static readonly RIO_DE_JANEIRO = new UnidadeFederativa("Rio de Janeiro", "RJ");

  private constructor(
    public readonly nome: string,
    public readonly sigla: string
  ) {}

  toString(): string {
    return `${this.nome} (${this.sigla})`;
  }
}

class Genero {
  static readonly MASCULINO = new Genero("M", "Masculino");
  static readonly FEMININO = new Genero("F", "Feminino");

  private constructor(
    public readonly caractere: string,
    public readonly texto: string
  ) {}

  toString(): string {
    return this.texto;
  }
}

class EstadoCivil {
  static readonly SOLTEIRO = new EstadoCivil("Solteiro");
  static readonly CASADO = new EstadoCivil("Casado");
  static readonly SEPARADO = new EstadoCivil("Separado");
  static readonly DIVORCIADO = new EstadoCivil("Divorciado");
  static readonly VIUVO = new EstadoCivil("Viuvo");

  private constructor(public readonly texto: string) {}

  toString(): string {
    return this.texto;
  }
}

class Setor {
  static readonly ENGENHARIA = new Setor("Engenharia");
  static readonly SAUDE = new Setor("Saude");
  static readonly JURIDICO = new Setor("Juridico");
  static readonly RECURSOS_HUMANOS = new Setor("Recursos Humanos");
  static readonly MARKETING = new Setor("Marketing");
  static readonly OPERACOES = new Setor("Operacoes");

  private constructor(public readonly nome: string) {}

  toString(): string {
    return this.nome;
  }
}

class SetorFornecedor {
  static readonly TECNOLOGIA = new SetorFornecedor("Tecnologia");
  static readonly MATERIAL_CONSTRUCAO = new SetorFornecedor("Material de Construcao");
  static readonly MATERIA_PRIMA = new SetorFornecedor("Materia Prima");
  static readonly ALIMENTICIO = new SetorFornecedor("Alimenticio");

  private constructor(public readonly nome: string) {}

  toString(): string {
    return this.nome;
  }
}

class Endereco {
  protected logradoure: string;
  protected numero: string;
  protected complemento: string;
  protected cep: string;
  protected cidade: string;
  protected uf: UnidadeFederativa;

  constructor(
    logradoure: string,
    numero: string,
    complemento: string,
    cep: string,
    cidade: string,
    uf: UnidadeFederativa
  ) {
    this.logradoure = logradoure;
    this.numero = numero;
    this.complemento = complemento;
    this.cep = cep;
    this.cidade = cidade;
    this.uf = uf;
  }

  toString(): string {
    return `${this.logradoure}, ${this.numero}, ${this.complemento}, ${this.cidade} - ${this.uf.sigla}, CEP ${this.cep}`;
  }
}

abstract class Pessoa {
  protected nome: string;
  protected telefone: string;
  protected email: string;
  protected endereco: Endereco;

  constructor(nome: string, telefone: string, email: string, endereco: Endereco) {
    this.nome = nome;
    this.telefone = telefone;
    this.email = email;
    this.endereco = endereco;
  }

  toString(): string {
    return `Nome: ${this.nome}, Telefone: ${this.telefone}, Email: ${this.email}, Endereco: ${this.endereco.toString()}`;
  }
}

abstract class Fisica extends Pessoa {
  protected genero: Genero;
  protected estadoCivil: EstadoCivil;
  protected dataNascimento: Date;

  constructor(
    nome: string,
    telefone: string,
    email: string,
    endereco: Endereco,
    genero: Genero,
    estadoCivil: EstadoCivil,
    dataNascimento: Date
  ) {
    super(nome, telefone, email, endereco);
    this.genero = genero;
    this.estadoCivil = estadoCivil;
    this.dataNascimento = dataNascimento;
  }

  getIdade(): number {
    const hoje = new Date();
    let idade = hoje.getFullYear() - this.dataNascimento.getFullYear();
    const mes = hoje.getMonth() - this.dataNascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < this.dataNascimento.getDate())) {
      idade--;
    }
    return idade;
  }

  toString(): string {
    return `${super.toString()}, Genero: ${this.genero.toString()}, EstadoCivil: ${this.estadoCivil.toString()}, Idade: ${this.getIdade()}`;
  }
}

abstract class Juridica extends Pessoa {
  protected cnpj: string;
  protected inscricaoEstadual: string;

  constructor(
    nome: string,
    telefone: string,
    email: string,
    endereco: Endereco,
    cnpj: string,
    inscricaoEstadual: string
  ) {
    super(nome, telefone, email, endereco);
    this.cnpj = cnpj;
    this.inscricaoEstadual = inscricaoEstadual;
  }

  toString(): string {
    return `${super.toString()}, CNPJ: ${this.cnpj}, InscricaoEstadual: ${this.inscricaoEstadual}`;
  }
}

class Cliente extends Fisica {
  protected protocoloAtendimento: number;

  constructor(
    nome: string,
    telefone: string,
    email: string,
    endereco: Endereco,
    genero: Genero,
    estadoCivil: EstadoCivil,
    dataNascimento: Date,
    protocoloAtendimento: number
  ) {
    super(nome, telefone, email, endereco, genero, estadoCivil, dataNascimento);
    this.protocoloAtendimento = protocoloAtendimento;
  }

  toString(): string {
    return `${super.toString()}, ProtocoloAtendimento: ${this.protocoloAtendimento}`;
  }
}

interface SalarioFinal {
  getSalarioFinal(): number;
}

interface Contratacao {
  admitir(funcionario: Funcionario): void;
  demitir(funcionario: Funcionario): void;
}

abstract class Funcionario extends Fisica implements SalarioFinal {
  protected cpf: string;
  protected rg: string;
  protected matricula: string;
  protected setor: Setor;
  protected salario: number;

  constructor(
    nome: string,
    telefone: string,
    email: string,
    endereco: Endereco,
    genero: Genero,
    estadoCivil: EstadoCivil,
    dataNascimento: Date,
    cpf: string,
    rg: string,
    matricula: string,
    setor: Setor,
    salario: number
  ) {
    super(nome, telefone, email, endereco, genero, estadoCivil, dataNascimento);
    this.cpf = cpf;
    this.rg = rg;
    this.matricula = matricula;
    this.setor = setor;
    this.salario = salario;
  }

  getSalarioFinal(): number {
    return this.salario;
  }

  toString(): string {
    return `${super.toString()}, CPF: ${this.cpf}, RG: ${this.rg}, Matricula: ${this.matricula}, Setor: ${this.setor.toString()}, Salario: ${this.salario}`;
  }
}

class Engenheiro extends Funcionario {
  protected crea: string;

  constructor(
    nome: string,
    telefone: string,
    email: string,
    endereco: Endereco,
    genero: Genero,
    estadoCivil: EstadoCivil,
    dataNascimento: Date,
    cpf: string,
    rg: string,
    matricula: string,
    setor: Setor,
    salario: number,
    crea: string
  ) {
    super(nome, telefone, email, endereco, genero, estadoCivil, dataNascimento, cpf, rg, matricula, setor, salario);
    this.crea = crea;
  }

  toString(): string {
    return `${super.toString()}, CREA: ${this.crea}`;
  }
}

class Medico extends Funcionario {
  protected crm: string;

  constructor(
    nome: string,
    telefone: string,
    email: string,
    endereco: Endereco,
    genero: Genero,
    estadoCivil: EstadoCivil,
    dataNascimento: Date,
    cpf: string,
    rg: string,
    matricula: string,
    setor: Setor,
    salario: number,
    crm: string
  ) {
    super(nome, telefone, email, endereco, genero, estadoCivil, dataNascimento, cpf, rg, matricula, setor, salario);
    this.crm = crm;
  }

  toString(): string {
    return `${super.toString()}, CRM: ${this.crm}`;
  }
}

class Motoboy extends Funcionario {
  protected carteiraDeHabilitacao: string;

  constructor(
    nome: string,
    telefone: string,
    email: string,
    endereco: Endereco,
    genero: Genero,
    estadoCivil: EstadoCivil,
    dataNascimento: Date,
    cpf: string,
    rg: string,
    matricula: string,
    setor: Setor,
    salario: number,
    carteiraDeHabilitacao: string
  ) {
    super(nome, telefone, email, endereco, genero, estadoCivil, dataNascimento, cpf, rg, matricula, setor, salario);
    this.carteiraDeHabilitacao = carteiraDeHabilitacao;
  }

  toString(): string {
    return `${super.toString()}, CarteiraDeHabilitacao: ${this.carteiraDeHabilitacao}`;
  }
}

class Diretor extends Funcionario implements Contratacao {
  static readonly PREMIO: number = 0.2;
  protected subordinados: Funcionario[] = [];

  constructor(
    nome: string,
    telefone: string,
    email: string,
    endereco: Endereco,
    genero: Genero,
    estadoCivil: EstadoCivil,
    dataNascimento: Date,
    cpf: string,
    rg: string,
    matricula: string,
    setor: Setor,
    salario: number
  ) {
    super(nome, telefone, email, endereco, genero, estadoCivil, dataNascimento, cpf, rg, matricula, setor, salario);
  }

  getSalarioFinal(): number {
    return this.salario + this.salario * Diretor.PREMIO;
  }

  admitir(funcionario: Funcionario): void {
    const index = this.subordinados.indexOf(funcionario);
    if (index === -1) {
      this.subordinados.push(funcionario);
    }
  }

  demitir(funcionario: Funcionario): void {
    const index = this.subordinados.indexOf(funcionario);
    if (index !== -1) {
      this.subordinados.splice(index, 1);
    }
  }

  toString(): string {
    return `${super.toString()}, SalarioFinal: ${this.getSalarioFinal()}, Subordinados: ${this.subordinados.length}`;
  }
}

class Produto {
  protected nome: string;
  protected categoria: string;
  protected preco: number;

  constructor(nome: string, categoria: string, preco: number) {
    this.nome = nome;
    this.categoria = categoria;
    this.preco = preco;
  }

  toString(): string {
    return `Nome: ${this.nome}, Categoria: ${this.categoria}, Preco: ${this.preco}`;
  }
}

class PrestacaoServico extends Juridica {
  protected contratoInicio: Date;
  protected contratoFim: Date;

  constructor(
    nome: string,
    telefone: string,
    email: string,
    endereco: Endereco,
    cnpj: string,
    inscricaoEstadual: string,
    contratoInicio: Date,
    contratoFim: Date
  ) {
    super(nome, telefone, email, endereco, cnpj, inscricaoEstadual);
    this.contratoInicio = contratoInicio;
    this.contratoFim = contratoFim;
  }

  toString(): string {
    return `${super.toString()}, ContratoInicio: ${this.contratoInicio.toISOString()}, ContratoFim: ${this.contratoFim.toISOString()}`;
  }
}

class Fornecedor extends Juridica {
  protected setor: SetorFornecedor;
  protected produto: Produto;

  constructor(
    nome: string,
    telefone: string,
    email: string,
    endereco: Endereco,
    cnpj: string,
    inscricaoEstadual: string,
    setor: SetorFornecedor,
    produto: Produto
  ) {
    super(nome, telefone, email, endereco, cnpj, inscricaoEstadual);
    this.setor = setor;
    this.produto = produto;
  }

  toString(): string {
    return `${super.toString()}, Setor: ${this.setor.toString()}, Produto: ${this.produto.toString()}`;
  }
}
