/**
 * @classdesc
 * Extendemos Error para manter o rastreamento de pilha e ter o nome de arquivo
 * e linha corretos. Utilizamos o código extra abaixo para contornar o problema
 *  gerado pelo uso da sintaxe pura de ES6 com TS, que faria perder a referência
 * da instância de AppErro ao extender a classe Error.
 */
export class AppError extends Error {
  status: number;

  data: any;

  message: string;

  constructor(status: number, message: string, data: any = {}) {
    super();

    // necessário para AppError instanceof Error => true
    Object.setPrototypeOf(this, new.target.prototype);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    this.name = this.constructor.name;
    this.data = data;
    this.status = status;
    this.message = message;
  }
}
