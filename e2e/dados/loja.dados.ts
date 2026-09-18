export const produtosEsperados = [ 
  { nome: 'Grey jacket', preco: '£55.00' }, // Primeiro produto e seu preço.
  { nome: 'Noir jacket', preco: '£60.00' }, // Segundo produto e seu preço.
  { nome: 'Striped top', preco: '£50.00' }, // Terceiro produto e seu preço.
] as const; // Mantém esses valores fixos durante os testes.

export const termoPesquisa = 'jacket'; // Termo usado no teste de pesquisa.
export const produtoDetalhe = produtosEsperados[0]; // Produto usado no teste de detalhes.
