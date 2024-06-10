import { fixture } from "testcafe";
import { Selector } from "testcafe";


fixture `Not matching passwords in user registration`
   .page `http://localhost:5173/RegisterUser`;

test('Not matching passwords in user registration', async t => {
   const selectDocumentType = Selector('#document-type');
   const document = Selector('#document-number');
   const address = Selector('#address');
   const cellphone = Selector('#cellphone');
   const email = Selector('#email');
   const password = Selector('#password');
   const registerButton = Selector('#register-button');
   
   await t
      .typeText('#name', 'Juan')
      .typeText('#lastname', 'Perez Ramirez')
      .click(selectDocumentType)
      .click(Selector('option').withText('CI'))
      .typeText(document, '1234567')
      .typeText(address, 'Calle 123 Avenida 456')
      .typeText(cellphone, '1234567')
      .typeText(email, 'testQA@gmail.com')
      .typeText(password, 'Password1!2')
      .typeText(Selector('#password-confirm'), 'Password1!3')
      .expect(Selector('.error-message').innerText).eql('Las contraseñas no coinciden');

});
      




