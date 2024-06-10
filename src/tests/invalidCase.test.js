import { Selector } from 'testcafe';


fixture `Create a invalid test case`
  .page `http://localhost:5173`;

test('Login as a lawyer then creating an invalid legal case:', async t => {
  const errorMessage = Selector('#error-message');
  const homeH1 = Selector('#legalCases');
  const registerCase = Selector('#register-case-button');
  const centeredAppleFontRc = Selector('#centered-apple-font-rc');

  const titleRegistrationForm = Selector('#title');
  const startDateRegistrationForm = Selector('#startDate');
  const summaryRegistrationForm = Selector('#summary');
  const counterpartRegistrationForm = Selector('#counterpart');
  const startDateInstance = Selector('#startDateInstace');
  const endDateInstance = Selector('#endDateInstace');
  const registerButton = Selector('#register-button');
  const errorMessageForm = Selector('#error-message-form');
  
  const currentDate = new Date();

  await t
    .typeText('#username', 'test-lawyer')
    .typeText('#password', 'Admin12_')
    .click('#login-button')
    .wait(1000)
    .click(registerCase)
    .typeText(titleRegistrationForm, 'Test Case')
    .click(startDateRegistrationForm)
    .typeText(summaryRegistrationForm, 'This is a test case')
    .typeText(counterpartRegistrationForm, 'Test counterpart')
    .click(registerButton)
    .wait(1000)
    .expect(errorMessageForm.innerText).eql('Por favor, llene todos los campos');
});
