import { Selector } from 'testcafe';


fixture `Create a legal case test`
  .page `http://localhost:5173`;

test('Login as a lawyer then creating a legal case:', async t => {
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
  const successMessage = Selector('#success-message');
  
  const currentDate = new Date();

  await t
    .typeText('#username', 'test-lawyer')
    .typeText('#password', 'Admin12_')
    .click('#login-button')
    .wait(1000)
    .click(registerCase)
    .typeText(titleRegistrationForm, 'Test Case')
    .click(startDateRegistrationForm)
    .typeText(startDateRegistrationForm, currentDate.toISOString().split('T')[0]) 
    .typeText(summaryRegistrationForm, 'This is a test case')
    .typeText(counterpartRegistrationForm, 'Test counterpart')
    .typeText(startDateInstance, '2024-06-10')  
    .typeText(endDateInstance, '2024-06-11')
    .click(registerButton)
    .wait(2000)
    .expect(successMessage.innerText).eql('Caso registrado con éxito!');
});
