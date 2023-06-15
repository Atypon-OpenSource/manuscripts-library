pipeline {
    agent {
        label 'cisc10'
    }
    parameters {
        booleanParam(name: 'PUBLISH', defaultValue: false)
    }
    stages {
        stage('Build') {
            steps {
                sh 'yarn install --non-interactive --frozen-lockfile'
                sh 'yarn typecheck'
                sh 'yarn lint'
                sh 'yarn test'
                sh 'yarn build'
            }
        }
        stage ('Publish') {
            when {
                expression { params.PUBLISH == true }
            }
            environment {
                NPM_TOKEN = credentials('NPM_TOKEN_MANUSCRIPTS_OSS')
            }
            steps {
                sh 'npx @manuscripts/publish'
            }
        }
    }
}
