import { useState,useContext } from "react";
import FormInput from "../form-input/form-input.componenet";
import Button from "../button/button.component";
import {
    signInWithGooglePopup,
    createUserDocumentFromAuth ,
    signinAuthWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import './sign-in-form.styles.scss';
import { UserContext } from "../../contexts/user.context";

const defaultSigninFields = {email:"",password:""}

const SignInForm = () => {

    const [signInFields,setSignInFields] = useState(defaultSigninFields)
    const {email,password} = signInFields;

    const { setCurrentUser } = useContext(UserContext)

    const signInWithGoogle = async () => {
        console.log('clicked')
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };

    const resetFormfields = () => {
        setSignInFields(defaultSigninFields)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const {user} = await signinAuthWithEmailAndPassword(email,password);
            setCurrentUser(user);
            resetFormfields();
        }catch(error){
            console.log(`error in signing in ${error.code}`)
            switch(error.code){
                case 'auth/wrong-password':
                    alert("incorrect password for email");
                    break;
                case 'auth/user-not-found':
                    alert("no user associated witthis email");
                    break;
                default:
                    console.log(error);
            };
        };
    };

    const handleChange = (event) => {
        const {name,value} = event.target;
        setSignInFields({...signInFields,[name]:value})
    }

    return(
        <div className="sign-up-container">
            <h1>sign in page</h1>
            <form onSubmit={handleSubmit}>
                <FormInput 
                type="email" 
                label="Email" 
                name="email" 
                value={email}
                required
                onChange={handleChange}/>
                <FormInput 
                type="password" 
                label="Password" 
                name="password" 
                value={password}
                required
                onChange={handleChange}/>
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType='google' onClick={() => signInWithGoogle()} >Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;