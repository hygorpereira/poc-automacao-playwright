import { expect, Locator, Page } from '@playwright/test'; 

export class homeLoja { // Page Object da página inicial da loja
  readonly pagina: Page; // vai guardar a instância da página do Playwright

  // Declarações: só definem o tipo de cada propriedade, ainda sem valor
  readonly titulo: Locator; // propriedade declarada para armazenar o locator do heading com o nome da loja
  readonly linkLogin: Locator; // propriedade declarada para armazenar o locator do link de login
  readonly gridProdutos: Locator; // propriedade declarada para armazenar o locator do container de produtos
  readonly linkCarrinho: Locator; // propriedade declarada para armazenar o locator do link do carrinho
  readonly formularioPesquisa: Locator; // propriedade declarada para armazenar o locator do form de busca
  readonly produtos: Locator; // propriedade declarada para armazenar o locator de todos os links de produto
  readonly campoPesquisa: Locator; // propriedade declarada para armazenar o locator do input de busca
  readonly botaoAdicionarAoCarrinho: Locator; // propriedade declarada para armazenar o locator do botão de adicionar ao carrinho

  constructor(pagina: Page) {
    this.pagina = pagina; // guarda a página recebida no teste

    // Atribuições: aqui os locators são de fato criados e guardados nas propriedades acima
    this.titulo = pagina.getByRole('heading', { name: /sauce demo/i }); // busca por role heading + texto (case-insensitive).
    this.linkLogin = pagina.getByRole('link', { name: 'Log In' }); // busca por role link + texto "Log In".
    this.gridProdutos = pagina.locator('section[class*=product-grid]'); // busca por classe CSS parcial o grid de produtos.
    this.linkCarrinho = pagina.getByRole('link', { name: 'My Cart' }); // busca por role link + "My Cart".
    this.formularioPesquisa = pagina.locator('form[action="/search"]'); // busca pelo atributo action do form.
    this.produtos = pagina.locator('a[href*="/products/"]'); // busca por href contendo "/products/".
    this.campoPesquisa = pagina.locator('input[name="q"]'); // busca pelo atributo name do input.
    this.botaoAdicionarAoCarrinho = pagina.getByRole('button', { name: /add to cart|adicionar/i }); // busca por role button, regex cobre PT/EN.
  }

  async abrir(): Promise<void> { // Abre a página inicial da loja.
    await this.pagina.goto('/'); // Acessa a página inicial.
    await expect(this.pagina).toHaveTitle(/Sauce Demo/i); // Confirma que a página correta foi aberta.
  }

  async abrirProduto(nome: string): Promise<void> { // Abre um produto pelo nome.
    await this.pagina.getByRole('link', { name: new RegExp(`^${nome}\\s`, 'i') }).first().click(); // Clica no primeiro link encontrado.
  }

  async pesquisar(termo: string): Promise<void> { // Pesquisa um termo na loja.
    await this.campoPesquisa.fill(termo); // Digita o termo no campo de pesquisa.
    await this.campoPesquisa.press('Enter'); // Envia a pesquisa pressionando Enter.
  }

  imagemProduto(nome: string): Locator { // Encontra a imagem de um produto.
    return this.pagina.locator(`img[alt="${nome}"]`).first(); // Retorna a primeira imagem com esse nome.
  }

  precoProduto(preco: string): Locator { // Encontra o preço de um produto.
    return this.pagina.getByText(preco, { exact: true }); // Retorna o texto exato do preço.
  }
}
