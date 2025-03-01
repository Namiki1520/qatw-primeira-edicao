import { test, expect } from '@playwright/test';
import { obterCodigo2FA } from '../support/db';
import { LoginPage } from '../pages/LoginPage';
import { DashPage } from '../pages/DashPage';
import { cleanJobs, getJob } from '../support/redis';

test('Nao deve logar quando o codigo de autenticacao e invalido', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const usuario = {
    cpf: '00000014141',
    senha: '147258',
  };

  await loginPage.acessaPagina();
  await loginPage.preencheCPF(usuario.cpf);
  await loginPage.preencheSenha(usuario.senha);

  await loginPage.preencheCodigo2FA('123456');

  await expect(page.locator('span')).toContainText('Código inválido. Por favor, tente novamente.');
});

test('Deve acessar a conta do usuário pegando codigo redis', async ({ page }) => {
const loginPage = new LoginPage(page)
  const dashPage = new DashPage(page)
  
  const usuario = {
    cpf: '00000014141',
    senha: '147258'
  }
  
  await cleanJobs()

  await loginPage.acessaPagina()
  await loginPage.preencheCPF(usuario.cpf)
  await loginPage.preencheSenha(usuario.senha)

  // checkpoint
  await page.getByRole('heading', {name: 'Verificação em duas etapas'})
    .waitFor({timeout: 3000})

  const codigo = await getJob()

  await loginPage.preencheCodigo2FA(codigo)

  await expect(await dashPage.obterSaldo()).toHaveText('R$ 5.000,00')  
});

test('Deve acessar a conta do usuário pegando código do banco', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashPage = new DashPage(page);

  const usuario = {
    cpf: '00000014141',
    senha: '147258',
  };

  await loginPage.acessaPagina();
  await loginPage.preencheCPF(usuario.cpf);
  await loginPage.preencheSenha(usuario.senha);

  await page.getByRole('heading', { name: 'verificação em duas etapas' })
    .waitFor({ timeout: 3000 });

   const codigo = await obterCodigo2FA(usuario.cpf);
  await loginPage.preencheCodigo2FA(codigo);

  await expect(await dashPage.obterSaldo()).toHaveText('R$ 5.000,00');
});