export default function SignUp() {
    return <form>
        <div>
            <label id="sign-up--email-field" htmlFor="sign-up--email-input">Email</label>
            <input id="sign-up--email-input" type="text"/>
        </div>
        <div>
            <label id="sign-up--password-field" htmlFor="sign-up--password-input">Password</label>
            <input id="sign-up--password-input" type="text"/>
        </div>
        <div>
            <input color="primary" type="submit" value="Sign Up"/>
        </div>
    </form>
}
