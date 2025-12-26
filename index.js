import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';


document.addEventListener('click', function (e) {
    if (e.target.dataset.reply) {
        getRepliesClick(e.target.dataset.reply)
    } else if (e.target.dataset.like) {
        getLikesClick(e.target.dataset.like)
    } else if (e.target.dataset.retweet) {
        getRetweetsClick(e.target.dataset.retweet)
    } else if (e.target.id === "tweet-btn" && document.getElementById('tweet-area').value) {
        tweetPost()

    }
})

function getRepliesClick(replyId) {
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')


}

function getLikesClick(likeId) {
    const tweetObj = tweetsData.filter(function (tweet) {
        return tweet.uuid === likeId
    })[0]
    if (tweetObj.isLiked) {
        tweetObj.likes--
    } else {
        tweetObj.likes++
    }
    tweetObj.isLiked = !tweetObj.isLiked
    render()
}

function getRetweetsClick(retweetId) {
    const tweetObj = tweetsData.filter(function (tweet) {
        return tweet.uuid === retweetId
    })[0]
    if (tweetObj.isRetweeted) {
        tweetObj.retweets--
    } else {
        tweetObj.retweets++
    }
    tweetObj.isRetweeted = !tweetObj.isRetweeted
    render()
}

function tweetPost() {
    tweetsData.unshift({
        handle: `@sibrahim 💎`,
        profilePic: `images/scrimbalogo.png`,
        likes: 0,
        retweets: 0,
        tweetText: document.getElementById('tweet-area').value,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: uuidv4(),
    })
    document.getElementById('tweet-area').value = ''
    render()
}
function getFeedHtml() {
    let feedhtml = ''





    tweetsData.forEach(function (tweet) {
        let liked = ''
        let retweeted = ''
        if (tweet.isLiked) {
            liked = 'liked'
        } else if (tweet.isRetweeted) {
            retweeted = 'retweeted'
        }
        let repliesHtml = ''

        if (tweet.replies.length > 0) {
            tweet.replies.forEach(function (reply) {
                repliesHtml += `
                <div class="tweet-reply">
                <div class="tweet-inner">
                    <img src="${reply.profilePic}" class="profile-pic">
                        <div>
                            <p class="handle">${reply.handle}</p>
                            <p class="tweet-text">${reply.tweetText}</p>
                        </div>
                    </div>
                </div>
                `
            })
        }
        feedhtml += `
            <div class="tweet">
                <div class="tweet-inner">
                    <img src=${tweet.profilePic} class="profile-pic">
                    <div>
                        <p class="handle">${tweet.handle}</p>
                        <p class="tweet-text">${tweet.tweetText} </p>
                        <div class="tweet-details">
                            <span class="tweet-detail">
                            <i class="fa-regular fa-comment-dots" data-reply=${tweet.uuid} ></i>
                                ${tweet.replies.length} 
                            </span>
                            <span class="tweet-detail">
                            <i class="fa-solid fa-heart ${liked}" data-like=${tweet.uuid}></i>    
                            ${tweet.likes} 
                            </span>
                            <span class="tweet-detail">
                            <i class="fa-solid fa-retweet ${retweeted}" data-retweet=${tweet.uuid}></i>
                                ${tweet.retweets} 
                            </span>
                        </div>   
                    </div>            
                </div>
                <div class="hidden" id="replies-${tweet.uuid}">
                    ${repliesHtml}
                </div>
            </div>
        `
    })
    return feedhtml
}

function render() {
    document.getElementById('feed').innerHTML = getFeedHtml()
}

render()