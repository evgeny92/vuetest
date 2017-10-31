var app = new Vue({
      el: '#app',
      data: {
         startingZip: '',
         startingCity: '',
         endingZip: '',
         endingCity: ''
      },
      watch: {
         startingZip: function(){
            this.startingCity = '';
            if(this.startingZip.length == 5){
               this.lookupStartingZip()
            }
         },
         endingZip: function(){
            this.endingCity = '';
            if(this.endingZip.length == 5){
               this.lookupEndingZip()
            }
         },
      },
      methods: {
         lookupStartingZip: _.debounce(function(){
            var app = this;
            this.startingCity = "Searching...";
            axios.get('https://ziptasticapi.com/' + app.startingZip)
               .then(function(response){
                  app.startingCity = response.data.city + ', ' + response.data.state
               })
               .catch(function(error){
                  app.startingCity = "Invalid Zipcode"
               })
         }, 500),
         lookupEndingZip: _.debounce(function(){
            var app = this;
            this.endingCity = "Searching...";
            axios.get('https://ziptasticapi.com/' + app.endingZip)
               .then(function(response){
                  app.endingCity = response.data.city + ', ' + response.data.state
               })
               .catch(function(error){
                  app.endingCity = "Invalid Zipcode"
               })
         }, 500)
      }
   });
