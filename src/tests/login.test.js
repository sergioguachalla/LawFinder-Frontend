import { Selector } from 'testcafe';

fixture `Login Test`
  .page `http://localhost:5173`;

test('Login with invalid credentials: -admin -admin', async t => {
  const errorMessage = Selector('#error-message');
  const loginButton = Selector('#login-button');

  await t
    .maximizeWindow()
    .typeText('#username', 'admin')
    .typeText('#password', 'admin')
    .click('#login-button')
    .wait(4000)
    .expect(errorMessage.innerText).eql('Usuario o contraseña incorrectos');

});
