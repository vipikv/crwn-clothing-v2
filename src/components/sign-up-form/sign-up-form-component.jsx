import { useState } from "react";
import FormInput from "../form-input/form-input.componenet";
import './sign-up-form.styles.scss'
import Button from "../button/button.component";
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
const defaultFormfields = {
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''
};

const SignUpForm = () => {

    const [formfields,setFormfields] = useState(defaultFormfields);
    const {displayName,email,password,confirmPassword} = formfields;

    const resetFormfields = () => {
        setFormfields(defaultFormfields)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(password !== confirmPassword){
            alert('passwords do not match');
            return;
        }
        try{
           const res = await createAuthUserWithEmailAndPassword(email,password);
           console.log('response is ',res);

           await createUserDocumentFromAuth(res.user,{displayName})
           resetFormfields()
        }catch(error){
            
            if(error.code == 'auth/email-already-in-use'){
                alert('Cannot create user, email already in use')
            }else{
                console.log('error is ',error.message)
            }
        }
    }

    const handleChange = (event) => {
        const {name,value} = event.target;

        setFormfields({...formfields,[name]:value})

        console.log('formfields--> ',formfields)
    }

    return(
        <div className="sign-up-container">
            <h2>Don'n have an account</h2>
            <span>Sign upwith your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput type="text" label="Display Name"  required onChange={handleChange} name="displayName" value={displayName}/>

                <FormInput type="email" label="Email" required onChange={handleChange} name="email" value={email}/>

                <FormInput type="password" label="Password" required onChange={handleChange} name="password" value={password}/>

                <FormInput type="password" label="Confirm Password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
                <Button  type="submit" >Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;