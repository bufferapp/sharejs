module.exports=function(grunt){

  //Projectconfiguration.
  grunt.initConfig({
    pkg:{
      name:'sharejs',
      version:'0.0.3'
    },
    uglify:{
      sharejs:{
        files:{
          'min/<%= pkg.version %>/share.min.js':[ 'js/share.js' ]
        }
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default',['uglify']);
};
