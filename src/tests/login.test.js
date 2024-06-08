import { Selector } from 'testcafe';

fixture `Login Test`
  .page `http://localhost:5173`;

test('Login with invalid credentials', async t => {
  const errorMessage = Selector('.error-message');
  const loginButton = Selector('.login-button');

  await t
    .typeText('#username', 'admin')
    .typeText('#password', 'admin')
    .click(loginButton)
    .expect(errorMessage.innerText).eql('Usuario o contraseña incorrectos');
});

