import fetch from 'ismorphic-fetch'
export const REQUEST_POSTS = 'REQUEST_POSTS'
function requestPosts(subreddit){
    return{
        type:REQUEST_POSTS,
        subreddit
    }
}

export const RECEIVE_POSTS='RECEIVE_POSTS'
function receivepPosts(subreddit,json){
    return{
        type:RECEIVE_POSTS,
        subreddit,
        posts:json.data.chidren.map(child=>child.data),
        receivedAt:DateNow()
    }
}

function fetchPosts(subreddit){
    return function (dispatch){
        dispatch(requestPosts(subreddit))
        return fetch('http://www.subreddit.com/r/${subreddit}.json')
        .then(response=>response.json())
        .then(json=>dispatch(receivePosts(subreddit,json)))
    }
}

function shouldFetchPosts(state,subreddit){
    const posts = state.postsBySubreddit[subreddit]
    if(!posts){
        return true
    }else if(posts.isFetching){
        return false
    }else{
        return posts.didInvalidate
    }
}

export function fetchPostsIfNeeded(subreddit){
    return (dispatch,getState)=>{
        if(shouldFetchPosts(getState(),subreddit)){
            return dispatch(fetchPosts(subreddit))
        }else{
            return Promise.resolve()
        }
    }
}

