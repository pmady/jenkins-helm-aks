podTemplate(containers: [
	containerTemplate(name: 'docker', image: 'docker:19.03.5', ttyEnabled: true, command: 'cat'),
	containerTemplate(name: 'helm', image: 'alpine/helm:3.3.0', ttyEnabled: true, command: 'cat')],
	volumes: [hostPathVolume(hostPath: '/var/run/docker.sock', mountPath: '/var/run/docker.sock')]) {
    node(POD_LABEL) {
	git 'https://github.com/pmady/jenkins-helm-aks.git'
	//env.GIT_COMMIT = sh(script: "git rev-parse HEAD", returnStdout: true).trim()

        stage('Build') {
	    container('docker') {
	    withCredentials([[$class: 'UsernamePasswordMultiBinding',
          credentialsId: 'ACR',
          usernameVariable: 'DOCKER_HUB_USER',
          passwordVariable: 'DOCKER_HUB_PASSWORD']]) {
		sh ''' 
		      TAG=test
		      IMAGE_NAME=$ACR_ID/node-app
		      docker login -u $DOCKER_HUB_USER -p DOCKER_HUB_PASSWORD
		      docker build -t $IMAGE_NAME:$TAG .'
		//docker.withRegistry('https://$ACR_ID', 'uqudo-acr') {
		      docker push $IMAGE_NAME:$TAG '''
         //   } 
            }
	   }
        }
	
	stage('Deploy') {
	  container('helm') {
	    stage('Install node-app helm chart') {
            	sh '''
            	PACKAGE=demo-chart
            	//DEPLOYED=$(helm list |grep -E "^${PACKAGE}" |grep DEPLOYED |wc -l)
                //if [ $DEPLOYED == 0 ] ; then
                //helm install --name ${PACKAGE} --set image.respository=$IMAGE_NAME--set image.tag=$TAG -n default
                //else
            	helm upgrade --name ${PACKAGE} --install node-app helm/node-app --set image.respository=$IMAGE_NAME--set image.tag=$TAG -n default
            	//fi
            	echo 'deployed successfully!'
            	'''
            	
	   }
	}
        }
    }
}
