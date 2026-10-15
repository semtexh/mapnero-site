// Install the exact packages listed in the vendor notice into an ignored prefix first.
const path=require('node:path'),fs=require('node:fs');
const root=path.resolve(__dirname,'..'),prefix=path.resolve(process.argv[2]||path.join(root,'outputs/buffer-build'));
for(const [name,version] of [['@turf/buffer','7.4.0'],['jsts','2.12.1'],['esbuild','0.28.2']]){
 const pkg=JSON.parse(fs.readFileSync(path.join(prefix,'node_modules',name,'package.json'),'utf8'));
 if(pkg.version!==version)throw Error('Expected '+name+' '+version);
}
require(path.join(prefix,'node_modules/esbuild')).buildSync({entryPoints:[path.join(__dirname,'spatial-buffer-vendor.mjs')],nodePaths:[path.join(prefix,'node_modules')],bundle:true,platform:'browser',format:'iife',globalName:'MapNeroSpatialVendor',minify:true,legalComments:'eof',outfile:path.join(root,'assets/vendor/spatial-buffer/buffer.js'),footer:{js:"if(typeof module==='object'&&module.exports)module.exports=MapNeroSpatialVendor;"}});
