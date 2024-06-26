import { insertIntoDOM } from "../utils_src/insert_into_DOM.js";
import { toastIt } from "../utils_src/toast_it.js";
class MainContent 
{

    #_mError;
    #mErrorMsg;
    #themeColor;

    constructor()
    {
        this.#_mError = 0;
        this.#mErrorMsg = '';
        this.#themeColor = 'purple darken-2';

    }


    /**
     * Public API
     */
    createUi()
    {

        if(this.#_mError == 0)
        {
            let content = `
            <div class="slider">
                <ul class="slides">
                    <li class="purple">
                        <!--
                        <img src="https://lorempixel.com/580/250/nature/4"> 
                        --> 
                        <!-- random image -->
                        <div class="caption center-align">

                            <h2 class="white-text text-accent-4"><b>Cnaps</b></h2>
                            <h3><small>The Fastest Way to Pay!</small></h3>
                            
                            <p>
                                <a href="#modal1" class="btn-large white lighten-4 purple-text text-darken-4 modal-trigger">GET STARTED</a>
                            </p>

                        </div>
                    </li>
                    <li class="purple">
                        <!--
                        <img src="https://lorempixel.com/580/250/nature/4"> 
                        --> 
                        <!-- random image -->
                        <div class="caption left-align">
                            <h2 class="white-text text-accent-4"><b>Cnapx</b></h2>
                            <h3><small>Secure Online Payment!</small></h3>
                            
                            <p>
                                <a href="#modal1" class="btn-large white lighten-4 purple-text text-darken-4 modal-trigger">GET STARTED</a>
                            </p>
                        </div>
                    </li>
                    <li class="purple">
                        <!--
                        <img src="https://lorempixel.com/580/250/nature/4"> 
                        --> 
                        <!-- random image -->
                        <div class="caption right-align">
                            <h2 class="white-text text-accent-4"><b>Cnapx</b></h2>
                            <h3><small>Payment Easier and Smooth!</small></h3>
                            <p>
                                <a href="#modal1" class="btn-large white lighten-4 purple-text text-darken-4 modal-trigger">GET STARTED</a>
                            </p>
                        </div>
                    </li>
                    <li class="purple">
                        <!--
                        <img src="https://lorempixel.com/580/250/nature/4"> 
                        -->
                        <!-- random image -->
                        <div class="caption center-align">
                            <h2 class="white-text text-accent-4"><b>Cnapx</b></h2>
                            <h3><small>For Snappy Payment!</small></h3>
                            <p>
                                <a href="#modal1" class="btn-large white lighten-4 purple-text text-darken-4 modal-trigger">GET STARTED</a>
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
            `;

            insertIntoDOM('main', content);
            var slider = document.querySelectorAll('.slider');
            M.Slider.init(slider, {
                indicators: false,
                height: 600
            });


            //Using the sniffing method check if the user-agent support offline functionality then Dynamically call the offline setup class and execute it

            if(window.indexedDB)//01
            {
                import("../indexeddb_src/offlinedb.js")
                .then(m => {
                    let offlinedb = new m.OfflineDB();
                    offlinedb.withDB(() => console.log("Offline DB set completed"));
                })
                .catch(error => {
                    console.log(error.message);
                    toastIt('red', 'This browser is evidently old!');
                });
            }
            else 
            {
                toastIt('red', 'Your browser need to be updated!');
            }
            

        }
        else 
        {
            toastIt('red', this.#mErrorMsg);
            console.log(this.#mErrorMsg);
        }
    }
}
export { MainContent };