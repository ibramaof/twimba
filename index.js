import { tweetsData } from "./data";




function render() {
    let innerHtml = document.getElementById('feed')
    innerHtml = ''
    tweetsData.forEach(function (tweet) {
        innerHtml += `
            <div class="tweet">
                <div class="tweet-inner">
                    <img src=${tweet.profilePic} class="profile-pic">
                    <div>
                        <p class="handle">${tweet.handle}</p>
                        <p class="tweet-text">${tweet.tweetText} </p>
                        <div class="tweet-details">
                            <span class="tweet-detail">
                                ${tweet.replies} 
                            </span>
                            <span class="tweet-detail">
                                ${tweet.likes} 
                            </span>
                            <span class="tweet-detail">
                                ${tweet.retweets} 
                            </span>
                        </div>   
                    </div>            
                </div>
            </div>
        `
    })
}

render()