import InputField from "../../../components/control/InputField";

const RememberMe = () => {
    return(
        <div className="container w-96 justify-start content-start flex flex-row">
            <input type="checkbox" id="checkBox" />
            <label for="checkbox" className="mx-5">Remember Me</label>
        </div>
    )

}

 export default RememberMe;