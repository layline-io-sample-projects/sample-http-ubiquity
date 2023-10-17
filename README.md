# layline.io Sample Project: Sample HTTP Ubiquity Unifi Network Controller

## Description

Working example for how to
1. login to ReST endpoint via HTTP
2. read from ReST endpoint via HTTP
3. map results to custom data format
4. write results to file
5. auto-repeat every x seconds

using layline.io. 

Use this to check how this is done and potentially use a similar setup in your Project. 

## Prerequisites

This sample project is configured to work in conjunction with a Ubiquity Unifi Network Controller.
You can, of course, rewrite the sample project to connect to another source of your choice, query different data and write to a different target.

## Getting Started

### Dependencies

* layline.io v1.2.2 or higher. Download [here](https://layline.io/download).
* supported OS (Windows, macOS, linux)

### Installing the Project

* Checkout to a directory of your choice 
* Start _Layline Configuration Server_ and _Layline Configuration Center_ (web UI).
* Using the Configuration Center, import the project. 
* Read [here](https://doc.layline.io/docs/concept/wf-config/configuration#importing-a-project-directory) how to import a Project.

### Adapting the Project to your specific environment

The project uses a few environment specific settings which you likely will have to adjust in order for the project to work. 
These are contained in the Assets "*MyEnvironment*" and "*MySecret*" respectively.

In "*MyEnvironment*" please adjust the path of your output directory for the results file.
In "MySecret" please adjust the username and password for the Unifi Controller login. Please ensure, that you are using an encryption key which is knnown to the Reactive Cluster which you are planning to run the Project on (e.g. you local Reactive Cluster).

To learn how to edit and use environment variables check [here](https://doc.layline.io/docs/assets/resources/asset-resource-environment).
To learn how to edit and use secrets check [here](https://doc.layline.io/docs/assets/resources/asset-resource-secret).

### Executing Project

To execute the Project, you have to deploy it to the Reactive Cluster and activate it.
Read [here](https://doc.layline.io/docs/concept/wf-config/deployment) on how to deploy a Project, and [here](https://doc.layline.io/docs/concept/operations/cluster#activating--deactivating-a-deployment) on how to activate/deactivate a deployment.

Check the Operations Logs in the Engine and Audit Trail to check whether everything is working correctly, or to identify potential issues.

## Help

If you need help with this Project, please [contact us](mailto:support@layline.io). We **will** answer :-)

## Version History

* 0.1
  * Initial Release

## License

All files and content in this repository are released under the [MIT](https://opensource.org/licenses/MIT) license. 
See the `license.txt` file  for details.

## More Resources

* [layline.io Documentation](https://doc.layline.io)
* [Getting Started](https://doc.layline.io/quickstart/)
* [Importing a Project](https://doc.layline.io/doc/wf-config/configuration.html#importing-a-project-directory)
* [Working with Environment Variables](https://doc.layline.io/docs/assets/resources/asset-resource-environment)
* [Working with Secrets](https://doc.layline.io/docs/assets/resources/asset-resource-secret)
* [Deployment](https://doc.layline.io/docs/concept/wf-config/deployment)
* [Project Activation](https://doc.layline.io/docs/concept/operations/cluster#activating--deactivating-a-deployment)

