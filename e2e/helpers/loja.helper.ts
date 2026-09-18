import { Page } from '@playwright/test';

export async function pesquisarProduto(pagina: Page, termo: string): Promise<void> { // Cria um atalho para pesquisar produtos.
  const campoPesquisa = pagina.locator('input[name="q"]'); // Encontra o campo de pesquisa.
  await campoPesquisa.fill(termo); // Digita o termo desejado.
  await campoPesquisa.press('Enter'); // Envia a pesquisa.
}

export async function abrirCarrinho(pagina: Page): Promise<void> { // Cria um atalho para abrir o carrinho.
  await pagina.goto('/cart'); // Acessa diretamente a página do carrinho.
}
