console.log('wired up!')

var appSelector = document.querySelector("#app-container")
var proSearchSelector = document.querySelector('.prof-search')
var proBtnSelector = document.querySelector('.prof-search-btn')

var hashChanger = function(evt){
   switch(evt.type){
      case "click":
         window.location.hash = proSearchSelector.value
         break;
      case "keydown":
         if(evt.keyCode === 13){
            window.location.hash = proSearchSelector.value
         }
         break;
      default:
         //no-op
   }

}
var nullFilter = function(string, nullReplacer){
   if(string === null){
      string = nullReplacer
   }
   else{
      string = string
   }
   return string
}



// HTML PROFILE AND REPO BUILDER FUNCTIONS
var profileBuilder = function(profileData){
   var proContainerSelector = document.querySelector(".profile-col")
      var profileHtml = '<img class="profile-img" src="'+ profileData.avatar_url + '" alt="https://flathash.com/matt">'
          profileHtml += '<h2 class="user-name">' + nullFilter(profileData.name, profileData.login) + '</h2>'
          profileHtml += '<h3 class="profile-name">' + profileData.login + '</h3>'
          profileHtml += '                  <hr><ul><li><i class="fa fa-map-marker" aria-hidden="true"></i> ' + nullFilter(profileData.location, '') + '</li>'
          profileHtml += '<li><i class="fa fa-envelope-o" aria-hidden="true"></i><a href="mailto:'+ profileData.email + '"> '+ nullFilter(profileData.email, '') + '</a></li>'
          profileHtml += '<li><i class="fa fa-rss" aria-hidden="true"></i><a href="'+ profileData.blog +'"> ' + nullFilter(profileData.blog, '') + '</a></li>'
          profileHtml += '<li><i class="fa fa-link" aria-hidden="true"></i><a href="'+ profileData.html_url +'"> ' + nullFilter(profileData.html_url, '') + '</a></li>'
          profileHtml += '</ul><hr>'
         proContainerSelector.innerHTML = profileHtml



}
var repoBuilder = function(repoArr){

   var repoColSelector = document.querySelector('.repo-col')
   var ulInsert = '               <ul class="repo-list"></ul>'
   repoColSelector.innerHTML = ulInsert
   forEach(repoArr, function(repoObj){
      var languageHolder = repoObj.language
      var storedLanguage =''
      var languageTitle = ''
      if(languageHolder != null){

         storedLanguage = languageHolder.toLowerCase();
         languageTitle = languageHolder

      }else{storedLanguage = 'no-lang'}
      var repoListSelector = document.querySelector('.repo-list')


          var repoHtml = '               <hr><div class="' + storedLanguage + '-type' +'">'
          repoHtml += '                  <li class ="repo-name"><a href="'+ repoObj.html_url +'">' + repoObj.name +'</a></li>'
          repoHtml += '<li><i class="fa fa-circle" aria-hidden="true"></i>' + languageTitle + '</li></div>'
          repoHtml += '<li><i class="fa fa-star" aria-hidden="true"></i>' + repoObj.stargazers_count + '</li>'
          repoListSelector.innerHTML += repoHtml


   })


}

// dynamic github info grabbing functions, "PROFILE" & "REPO"
var profileCreator = function(profileInput){
   $.getJSON('https://api.github.com/users/' + profileInput + '?' + myApiSecret).then(profileBuilder)

}

var repoCreator = function(profileInput){
   $.getJSON('https://api.github.com/users/' + profileInput + '/repos' + '?' + myApiSecret).then(repoBuilder)

}





var controlRouter = function(){
   var currentProfile = window.location.hash.slice(1)
   if(currentProfile.length === 0){
      profileCreator('aaronjlech')
      repoCreator('aaronjlech')


   }


   profileCreator(currentProfile)
   repoCreator(currentProfile)

}


var dataFetch = function(serverData){

   console.log(serverData.repos_url)
   // var htmlBuilder =
   // appSelector.innerHTML = '<img src="' + serverData.avatar_url +'">'

}

if(typeof myApiSecret === 'undefined'){

   var myApiSecret = ''

}

$.getJSON('https://api.github.com/users/matthiasak?' + myApiSecret).then(dataFetch)







proBtnSelector.addEventListener('click', hashChanger)
proSearchSelector.addEventListener('keydown', hashChanger)
window.addEventListener('hashchange', controlRouter)
controlRouter()
