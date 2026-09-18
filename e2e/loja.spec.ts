import { test, expect } from '@playwright/test';
import { produtosEsperados, produtoDetalhe, termoPesquisa } from './dados/loja.dados';
import { abrirCarrinho, pesquisarProduto } from './helpers/loja.helper';
import { homeLoja } from './pages/home-loja.page';

test.describe('Tela inicial', () => {

  test('CT001- Apresenta a estrutura principal da loja', async ({ page }) => {
    const loja = new homeLoja(page); // Cria o objeto que representa a loja.
    await loja.abrir(); // Abre a página inicial.

    await expect(loja.titulo).toBeVisible(); // Confirma que o título aparece.
    await expect(loja.formularioPesquisa).toHaveCount(1); // Confirma que existe um formulário de pesquisa.
    await expect(loja.linkLogin).toBeVisible(); // Confirma a presença do link para a tela de Login.
    await expect(loja.gridProdutos).toBeVisible(); // Confirma a presença do grid de produtos.
    await expect(loja.linkCarrinho).toBeVisible(); // Confirma a presença do link para a tela do carrinho de compras.
  });

  test('CT002- Exibe catálogo com quantidade, nomes e preços', async ({ page }) => {
    const loja = new homeLoja(page); // Cria o objeto que representa a loja.
    await loja.abrir(); // Abre a página inicial.

    await expect(loja.produtos).toHaveCount(produtosEsperados.length); // Confirma a quantidade de produtos esperada.
    for (const produto of produtosEsperados) { // Repete as verificações para cada produto da lista.
      await expect(page.getByText(produto.nome, { exact: true })).toBeVisible(); // Confirma que o nome aparece.
      await expect(loja.precoProduto(produto.preco)).toBeVisible(); // Confirma que o preço aparece.
    }
  });

  test('CT003- Pesquisa produtos por palavra-chave', async ({ page }) => {
    const loja = new homeLoja(page); // Cria o objeto que representa a loja.
    await loja.abrir(); // Abre a página inicial.

    await pesquisarProduto(page, termoPesquisa); // Pesquisa usando o helper reutilizável.

    await expect(page).toHaveURL(new RegExp(`/search\\?.*q=${termoPesquisa}`)); // Confirma a URL da pesquisa.
    await expect(page.getByText(/Grey jacket|Noir jacket/i).first()).toBeVisible(); // Confirma que há um resultado.
  });
});

test.describe('Produtos', () => {

  test('CT004- Valida o detalhe do produto e seus dados de compra', async ({ page }) => {
    const loja = new homeLoja(page); // Cria o objeto que representa a loja.
    await loja.abrir(); // Abre a página inicial.
    await loja.abrirProduto(produtoDetalhe.nome); // Abre o produto escolhido.

    await expect(page).toHaveURL(/grey-jacket/); // Confirma a URL do produto.
    await expect(page.getByRole('heading', { name: /grey jacket/i })).toBeVisible(); // Confirma o título do produto.
    await expect(loja.imagemProduto(produtoDetalhe.nome)).toHaveAttribute('alt', produtoDetalhe.nome); // Confirma a imagem correta.
    await expect(loja.precoProduto(produtoDetalhe.preco)).toBeVisible(); // Confirma o preço do produto.
    await expect(loja.botaoAdicionarAoCarrinho).toHaveCount(1); // Confirma que existe o botão de compra.
  });
})

test.describe('Carrinho de compras', () => {

  test('CT005- Acessa o carrinho e valida seu estado inicial', async ({ page }) => {
    await abrirCarrinho(page); // Abre o carrinho usando o helper reutilizável.

    await expect(page).toHaveURL(/\/cart$/); // Confirma a URL do carrinho.
    await expect(page.locator('p.empty')).toContainText(/your cart is empty|carrinho está vazio/i); // Confirma a mensagem de carrinho vazio.
  });
});
