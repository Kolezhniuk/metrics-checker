let svnUltimate = require('node-svn-ultimate');

class SvnCheckoutWrapper {
    static checkout() {
        const options = {	// optional options object - can be passed to any command not just update
            // trustServerCert: true,	// same as --trust-server-cert
            username: "dim12305",	// same as --username
            password: "23059696d",	// same as --password
            shell: "sh", 			// override shell used to execute command
            cwd: process.cwd(),		// override working directory command is executed
            quiet: true,			// provide --quiet to commands that accept it
            force: true,			// provide --force to commands that accept it
            revision: 33050,		// provide --revision to commands that accept it
            depth: "empty",			// provide --depth to commands that accept it
            ignoreExternals: true,	// provide --ignore-externals to commands that accept it
            params: ['-m "Commit comment"'] // extra parameters to pass
        };
        svnUltimate.commands.checkout('http://svn.groups.univ.kiev.ua/web-labs2014', 'data/svn', options, (err) => {
            debugger;
            console.log(err);
        });
    }
}

SvnCheckoutWrapper.checkout();
