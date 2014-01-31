Share.js (0.0.1)
=======

Trigger the Buffer Share Popup from any specified DOM element


Share.js is a super minimal and easy plug in to make any DOM element trigger a Buffer share.  It loads asynchronously to your page and doesn't add any overhead. Share.JS is still early in development, so please be sure to send any issues over to Sunil <sunil@bufferapp.com>. 

##How to use Share.js
1. Include this script in your header
    ```
<script src='https://d389zggrogs7qo.cloudfront.net/js/sharejs/0.0.2/share.min.js'></script>
    ```
2. Add an anchor tag with class 'buffer-share' and parameters

    ###Example:

    ```
<a class='buffer-share' 
    data-url='http://blog.bufferapp.com' 
    data-text="The Buffer Blog!" 
    data-preferred-login="twitter" 
    data-partner-source='feedly' 
    data-partner-placement='mini' 
    data-via='sunils34'>Share to Buffer</a>
    ```

##Optional Parameters:

- **data-url**: URL to share.  If not specified, the url will be the current page
- **data-text**: Text to share. 
- **data-preferred-login**: <twitter, linkedin, facebook> Preferred service to share to or login from
- **data-via**: Via (twitter screen_name)
- **data-partner-source**: Partner name.  
- **data-partner-placement**: Partner specified identifier (ie. mini)

####Native Retweets
Share.js supports creating Native Retweets.  You'll need to supply four params if you'd like to use this. 
- **data-retweeted-tweet-id**: Numeric Twitter ID of the status.  You can find this on the twitter url of a status
- **data-retweeted-user-id**: The twitter user id who created the status
- **data-retweeted-user-name**: The user screen name of the twitter user who created the status
- **data-retweeted-user-display-name**: The display name of the twitter user who created this status


##Creating Buffer Share DOM Elements with Javascript
If a buffer-share element is created via javascript after window.onload is called, then be sure to call call BufferShare.reload() afterwards. 

#Development
Buffer Share.js is open source.  While maintained by Buffer, we welcome any improvements you have!  Here's how you can get started contributing. 

##Building
1. Install grunt.js

```
$ sudo npm install -g grunt-cli
$ npm install
```

2. Run grunt after you're satisfied with your changes. 
```
$ grunt
```

##Contributing
When you've made your changes, feel free to submit pull requests.  When/if merged, we'll be sure to update the Share.JS version and upload it onto the Buffer CDN. 
