#!groovy
@Library('visibilityLibs')
import com.liaison.jenkins.visibility.Utilities;
import com.liaison.jenkins.common.sonarqube.SonarScanner;
import com.liaison.jenkins.common.testreport.TestResultsUploader
import com.liaison.jenkins.common.sonarqube.QualityGate
import com.liaison.jenkins.common.servicenow.ServiceNow
import com.liaison.jenkins.common.slack.*
import com.liaison.jenkins.common.kubernetes.*

def utils = new Utilities();
def uploadUtil = new TestResultsUploader()
def sonar = new SonarScanner()
def qg = new QualityGate()

def deployments = new Deployments()
def k8sDocker = new Docker()
def kubectl = new Kubectl()
def serviceNow = new ServiceNow()
def slack = new Slack()

def deployment
def dockerImageName
def crApproved = false

timestamps {
    node('at4d-c3-nodejs') {

        stage('Checkout') {
            // check out repository
            checkout scm;
            env.VERSION = utils.runSh("awk '/^## \\[([0-9])/{ print (substr(\$2, 2, length(\$2) - 2));exit; }' CHANGELOG.md");
            env.GIT_COMMIT = utils.runSh('git rev-parse HEAD')
            env.GIT_URL = utils.runSh("git config remote.origin.url | sed -e 's/\\(.git\\)*\$//g' ")
            env.REPO_NAME = utils.runSh("basename -s .git ${env.GIT_URL}")
            env.RELEASE_NOTES = utils.runSh("awk '/## \\[${env.VERSION}\\]/{flag=1;next}/## \\[/{flag=0}flag' CHANGELOG.md")
            currentBuild.displayName = "${env.VERSION}"
            stash name: "fullRepo", includes: "**" // all files and folders
            stash name: "npmBasics", includes: "*"
            stash name: "k8s", includes: "K8sfile.yaml"
        }

        stage('Install NPM, Build Version, NSP Check') {
            timeout(30) {
                // retrieving application information from the package.json
                env.PACKAGE_NAME = utils.runSh('node -e "console.log(require(\'./package.json\').name);"')
                env.PACKAGE_VERSION = utils.runSh('node -e "console.log(require(\'./package.json\').version);"')
                env.CURRENT_DATE_TIME = utils.runSh('node -e "console.log(new Date().toISOString().replace(/[-:]/g, \'\').replace(/T/g, \'-\').substring(0, 15));"')
                env.BUILD_VERSION_FILENAME = "build_version.json"

                if (utils.isMasterBuild()) {
                    currentBuild.displayName = 'v' + env.PACKAGE_VERSION
                }
            
                // printing build information for validating
                echo "package name: ${env.PACKAGE_NAME}"
                echo "package json version: ${env.PACKAGE_VERSION}"
                echo "current date time: ${env.CURRENT_DATE_TIME}"
                echo "git branch: ${env.GIT_BRANCH}"
                echo "git commit: ${env.GIT_COMMIT}"
                echo "pull request id: ${env.BRANCH_NAME}"
                echo "build number: ${env.BUILD_NUMBER}"
                echo "build version file: ${env.BUILD_VERSION_FILENAME}"
                echo "no cache docker build option enabled: ${env.NO_CACHE}"
                echo "forcing push of build artifact enabled: ${env.FORCE_PUSH}"

                // create the build version info json
                def sb = "";
                sb = sb + "{                                                     \n";
                sb = sb + "  \"packageName\": \"${env.PACKAGE_NAME}\",           \n";
                sb = sb + "  \"packageJsonVersion\": \"${env.PACKAGE_VERSION}\", \n";
                sb = sb + "  \"buildDateTime\": \"${env.CURRENT_DATE_TIME}\",    \n";
                sb = sb + "  \"gitCommit\": \"${env.GIT_COMMIT}\",               \n";
                sb = sb + "  \"pullRequestId\": \"${env.BRANCH_NAME}\",          \n";
                sb = sb + "  \"buildNumber\": \"${env.BUILD_NUMBER}\"            \n";
                sb = sb + "}                                                       ";
                def buildVersionStr = sb;

                // write the build info into a json file (this is reused within the application docker container!)
                utils.writeToFile(env.BUILD_VERSION_FILENAME, buildVersionStr);
                sh 'cat '+env.BUILD_VERSION_FILENAME

                // handling the results
                stash name: "buildInfo", includes: env.BUILD_VERSION_FILENAME
                echo "successfully created the build version JSON file!"

                sh 'node -v'
                sh 'npm -v'

                sh 'npm install'
                echo "npm install done"
                stash name: "nodeModules", includes: "node_modules/,dist/"
                echo "successfully installed npm dependencies!"
                
                utils.npmInstall("@liaison/node-changelog-parser-cli");
            }   
        }

        stage('Build NPM Dist') {
            timeout(10) {
                // build the project
                //sh 'NO_ENV_DOWNLOAD=true npm run build'
                sh 'NO_ENV_DOWNLOAD=true npm run build'
                // handling the results
                stash name: "dist", includes: "dist/"
                echo "The build was successful!"
            }
        }
        
        //     stage('Unit test') {
        //         timeout(10) {
        //             sh 'npm run test'
        //         //sh 'npm run report:unit:consolidate'
        //         }
        //     }

        //    stage('Code analysis') {
        //      // timeout after 40 minutes
        //          timeout(40) {
        //             sonar.runFullModeAnalysis('SonarQube Scanner', "${env.PACKAGE_VERSION}", './sonar-project.properties');
        //      }
        //    }
        //    stage('Quality Gate') {
        //        qg.checkQualityGate(env.REPO_NAME, 10, "${env.WORKSPACE}/.sonar")
        //    }

        stage('Build Docker Image') {
            timeout(25) {
                // getting context
                //utils.unstashMany(["npmBasics", "nodeModules", "dist", "buildInfo", "code"])
                utils.unstashMany(["npmBasics", "nodeModules", "dist", "buildInfo"])
                // setting up docker image&container names
                dockerImageName = "visibility/${env.PACKAGE_NAME}";

                deployment = deployments.create(
                        name: env.PACKAGE_NAME,
                        version: env.PACKAGE_VERSION,
                        description: 'infofabric-reference-data-ui',
                        dockerImageName: dockerImageName,
                        dockerImageTag: env.PACKAGE_VERSION,
                        yamlFile: 'K8sfile.yaml',   // optional, defaults to 'K8sfile.yml'
                        gitUrl: env.GIT_URL,        // optional, defaults to env.GIT_URL
                        gitCommit: env.GIT_COMMIT,   // optional, defaults to env.GIT_COMMIT
                        kubectl: kubectl
                )

                k8sDocker.build(imageName: dockerImageName)

                if (utils.isPRBuild()) {
                    echo "Pushing the image to registry..."
                    k8sDocker.push(imageName: dockerImageName, imageTag: env.PACKAGE_VERSION, registry: Registry.BROOKPARK)
                    k8sDocker.push(imageName: dockerImageName, imageTag: "latest")

                    echo "Creating github release notes..."
                    def releaseNotes = "Image: `registry-ci.at4d.liacloud.com/${dockerImageName}:${env.PACKAGE_VERSION}`\n\n${env.RELEASE_NOTES}"
                    utils.createGithubReleaseMultiLineReleaseNotes(env.PACKAGE_NAME, env.GIT_COMMIT, env.PACKAGE_VERSION, releaseNotes)
                }
            }
        }
    }

        stage('Deploy To K8S, Dev') {
        // Deploy to Kubernetes
        try {
            deployments.deploy(
                    deployment: deployment,
                    kubectl: kubectl,
                    serviceNow: serviceNow,
                    namespace: Namespace.DEVELOPMENT,
                    rollingUpdate: true,
                    clusters: [ Cluster.OTBP ]
            )
        } catch (err) {
            currentBuild.result = "FAILURE";
            error "${err}"
        }
    }


    if (utils.isMasterBuild()) {
        stage('Promote To QA') {

            def msg = """\
                | @here: Approve promotion of <${env.JOB_URL}|${env.JOB_NAME} #${env.BUILD_NUMBER}> to QA?(<${
                env.JOB_URL
            }|Open>)
                | - SonarQube analysis: <https://at4ch.liaison.dev/sonarqube/dashboard/index/${env.PACKAGE_NAME}|${
                env.PACKAGE_NAME
            }>
                | - Release notes for v${env.PACKAGE_VERSION}:
                |``` ${env.RELEASE_NOTES} ``` 
                |""".stripMargin().stripIndent()

            milestone ordinal: 200
            def approval = slack.waitForApproval(
                    channel: Slackchannel.DEV_SIGNOFF,
                    message: msg,
                    question: "Promote this build to QA?",
                    timeoutValue: 31,
                    timeoutUnit: 'DAYS'
            )

            if (!approval.isApproved()) {
                currentBuild.result = "ABORTED";
                slack.error(
                        channel: Slackchannel.DEV_SIGNOFF,
                        message: "@here: *${env.JOB_NAME} v${env.PACKAGE_NAME}* (build #${env.BUILD_NUMBER}) - QA deployment canceled by ${approval.user}"
                )
                serviceNow.cancel(
                        deployment: deployment,
                        comment: "QA deployment canceled by ${approval.user}"
                )
                error "QA deployment canceled by ${approval.user}"
            }

            serviceNow.promote(
                    deployment: deployment,
                    namespace: Namespace.QA,
                    approveUser: approval.user,
                    approveComment: ""      // optional, defaults to ""
            )

            milestone label: 'Promoted to QA by ${approval.user}', ordinal: 400

        }

        stage('Accept To QA') {

            def msg = """\
                |@here: Accept *${env.PACKAGE_NAME} v${env.PACKAGE_VERSION}* (build #${env.BUILD_NUMBER}) to QA? (<${
                env.JOB_URL
            }|Open>)
                |- <https://at4ch.liaison.dev/sonarqube/dashboard/index/${env.PACKAGE_NAME}|SonarQube analysis>
                |- Release notes for v${env.PACKAGE_VERSION}:
                |``` ${env.RELEASE_NOTES} ```
                |""".stripMargin().stripIndent()

            approval = slack.waitForApproval(
                    channel: Slackchannel.QA_APPROVALS,
                    message: msg,
                    question: "Accept this build to QA?",
                    timeoutValue: 31,       
                    timeoutUnit: 'DAYS'    
            )

            if (!approval.isApproved()) {
                currentBuild.result = "ABORTED";
                slack.error(
                        channel: Slackchannel.QA_APPROVALS,
                        message: "@here: *${env.JOB_NAME} v${env.VERSION}* (build #${env.BUILD_NUMBER}) - QA deployment rejected by ${approval.user}"
                )
                serviceNow.cancel(
                        deployment: deployment,
                        comment: "QA deployment rejected by ${approval.user}"
                )
                error "QA deployment rejected by ${approval.user}"
            }

            milestone label: 'Accepted to QA ${approval.user}', ordinal: 600
        }

        stage('Deploy To K8S, QA') {

            serviceNow.addWorknote(
                    deployment: deployment,
                    comment: "Accepted to QA by ${approval.user}"
            )

            try {
                deployments.deploy(
                        deployment: deployment,
                        kubectl: kubectl,
                        serviceNow: serviceNow,
                        namespace: Namespace.QA,
                        rollingUpdate: true     // optional, defaults to true
                )
            } catch (err) {
                currentBuild.result = "FAILURE";
                error "${err}"
            }
        }

        stage('QA Sign-Off') {

            def msg = """\
                |@here: <${env.JOB_URL}|${env.JOB_NAME} #${env.BUILD_NUMBER}> is waiting to be signed off to STAGING.
                |- version ${env.VERSION}
                |- Release Notes for ${env.VERSION}:
                |``` ${env.RELEASE_NOTES} ```
                |""".stripMargin().stripIndent()

            approval = slack.waitForApproval(
                    channel: Slackchannel.QA_APPROVALS,
                    message: msg,
                    question: "Sign-off by QA and promote to STAGING?",
                    timeoutValue: 31,       
                    timeoutUnit: 'DAYS'  
            )

            if (!approval.isApproved()) {
                currentBuild.result = "ABORTED";
                slack.error(
                        channel: Slackchannel.QA_APPROVALS,
                        message: "@here: *${env.JOB_NAME} v${env.VERSION}* (build #${env.BUILD_NUMBER}) - QA sign-off rejected by ${approval.user}"
                )
                serviceNow.cancel(
                        deployment: deployment,
                        comment: "QA sign-off rejected by ${approval.user}"
                )
                error "QA sign-off rejected by ${approval.user}"
            }

            serviceNow.promote(
                    deployment: deployment,
                    namespace: Namespace.STAGING,
                    approveUser: approval.user,
                    approveComment: ""
            )

            // Label all stored test reports from the build as 'QA Sign-off' in the QA Reporter.
            // Call once from the pipeline. Either after QA sign-off has been approved OR after
            // Staging sign if there is such stage defined.
            //uploadUtil.signOffReports("${env.REPO_NAME}", "${env.VERSION}")

            milestone label: 'QA sign-off by ${approval.user}', ordinal: 800
        }

        stage('Deploy to K8S, Staging') {
            node {
                k8sDocker.publish(
                        imageToPublish: "${deployment.dockerImageName()}:${deployment.dockerImageTag()}",
                        publishedImageName: deployment.dockerImageName(),
                        publishedImageTag: deployment.dockerImageTag()
                )
            }

            serviceNow.addWorknote(
                    deployment: deployment,
                    comment: "Docker image published to PROD registry" // ,
                    // testResultsUrl: QA_E2E_REPORT_URL
            )
            try {
                deployments.deploy(
                        deployment: deployment,
                        kubectl: kubectl,
                        serviceNow: serviceNow,
                        namespace: Namespace.STAGING,
                        rollingUpdate: true,
                        clusters: [ Cluster.AT4U_C1 ]
                )
            } catch (err) {
                currentBuild.result = "FAILURE";
                error "${err}"
            }
        }

        stage('Waiting For UAT AE Approval') {
            def msg = """\
                | @here Approve promotion of <${env.JOB_URL}|${env.JOB_NAME} #${env.BUILD_NUMBER}> to UAT in ServiceNow ticket!  
                |- ServiceNow CR: <${deployment.crUrl()}|${deployment.crNumber()}>
                |- Release Notes for ${env.VERSION}:
                |``` ${env.RELEASE_NOTES} ``` 
                |""".stripMargin().stripIndent()

            slack.info(
                    channel: Slackchannel.AE_APPROVALS,
                    message: msg
            )

            crApproved = serviceNow.waitForApproval(correlationId: deployment.gitCommit(), namespace: Namespace.UAT)
        }

        stage('Deploy To K8S, UAT') {

            if (crApproved) {
                milestone label: 'UAT approved', ordinal: 900
                try {
                    deployments.deploy(
                            deployment: deployment,
                            kubectl: kubectl,
                            serviceNow: serviceNow,
                            namespace: Namespace.UAT,
                            clusters: [ Cluster.AT4U_C1 ]
                    )
                } catch (err) {
                    currentBuild.result = "FAILURE"
                    error "${err}"
                }
                slack.info(
                        channel: Slackchannel.AE_APPROVALS,
                        message: "@here: *${env.JOB_NAME} v${env.VERSION}* (build #${env.BUILD_NUMBER}) was deployed to UAT."
                )
            } else {
                currentBuild.result = "ABORTED"
                slack.error(
                        channel: Slackchannel.AE_APPROVALS,
                        message: "@here: *${env.JOB_NAME} v${env.VERSION}* (build #${env.BUILD_NUMBER}) - UAT deployment rejected in ServiceNow"
                )
                error "UAT deployment rejected in ServiceNow"
            }
        }

        stage('Waiting For PROD AE Approval') {
            crApproved = serviceNow.waitForApproval(correlationId: deployment.gitCommit(), namespace: Namespace.PRODUCTION)
        }

        stage('Deploy To K8S, PROD') {

            if (crApproved) {
                milestone label: 'PRODUCTION approved', ordinal: 1000
                try {
                    deployments.deploy(
                            deployment: deployment,
                            kubectl: kubectl,
                            serviceNow: serviceNow,
                            namespace: Namespace.PRODUCTION,
                            clusters:  [ Cluster.AT4P_C1 ]
                    )

                    serviceNow.addWorknote(
                            deployment: deployment,
                            comment: "Datacast version ${env.VERSION} is successfully deployed to Production.",
                    )
                } catch (err) {
                    currentBuild.result = "FAILURE"
                    error "${err}"
                }
                slack.info(
                        channel: Slackchannel.AE_APPROVALS,
                        message: "@here: *${env.JOB_NAME} v${env.VERSION}* (build #${env.BUILD_NUMBER}) was deployed to PRODUCTION."
                )
            } else {
                currentBuild.result = "ABORTED"
                slack.error(
                        channel: Slackchannel.AE_APPROVALS,
                        message: "@here: *${env.JOB_NAME} v${env.VERSION}* (build #${env.BUILD_NUMBER}) - PRODUCTION deployment rejected in ServiceNow"
                )
                error "PRODUCTION deployment rejected in ServiceNow"
            }
        }
    }
}
