
let getCreateAccountForm = () => {
    return `
    <div class="row"  id="createAcountDiv">
        <form class="col s12" id="createAcount">
                            
                                
            <div class="input-field col s12">
                <input id="fullname" type="text" class="validate">
                <label for="fullname" class="blue-text text-darken-4">Enter full-name</label>
            </div>
                                
                                
            <div class="input-field col s12">
                <input id="phone" type="text" class="validate">
                <label for="phone" class="blue-text text-darken-4">Enter phone number</label>
            </div>
                                
                                
            <div class="input-field col s12">
                <input id="bvn" type="text" class="validate">
                <label for="bvn" class="blue-text text-darken-4">Enter BVN number</label>
            </div>

            <div class="input-field col s12">
                <input id="email" type="email" class="validate" required>
                <label for="email" class="blue-text text-darken-4">Email Address</label>
            </div>
            <div class="input-field col s12">
                <input id="password" type="password" class="validate" required>
                <label for="password" class="blue-text text-darken-4">Password</label>
            </div>
                                
                                
            <div class="input-field col s12">

                <input type="submit" id="btnAction" class="btn-small blue blue text-darken-4-text text-darken-4" value="Create Account">
                                    
            </div>
                                
                            
        </form>
    </div>
    `;
};
export { getCreateAccountForm };