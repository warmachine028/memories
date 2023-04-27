# Memories setup guidelines 🚀

**Hello contributor, I want you to stick to the below listed Setup guidelines to successfully setup the react app in your local system and get started with developing!!**

<br/>

- Check if your branch is behind the original branch.
- Always update the branch with original branch `memories:main` before starting any new developement.
- `Fork` the repo to your account.
- Open Git bash in a folder.
- Enter this command to clone the repo: 
   `git clone https://github.com/[your-github-id]/memories.git` 
- Now you have the repo in your **local storage**
- Open the project in VSCode or any Code Editor of your choice.
- Go inside `client` folder by using `cd client`.
- Next to setup the react app `npm i` in the terminal inside your project directory.
- SET Up Environment Variables
  - Take Help of `env.example` file to create `env.local` file.
  - This new file will not be tracked by git and is only stored localy.
  - Create all the credentials accordingly like: `GOOGLE_OAUTH_CLIENT_ID`, `MONGO_DB_URL` etc
- Once the node modules and other stuffs are installed , `npm start` to start the app in `http://localhost:3000/`
- You can acess the `server` folder to get the backend and start it with `npm start` in `http://localhost:5000/`
  - Currently since the server is already deployed, hence it uses the deployed server by default.
  - If you make changes in server files, then navigate to `client/src/api/`
  - Open `index.jsx` file. 
  - Change the index of the array from `const API = axios.create({ baseURL: apiURL[0] })` to `...apiURL[1]...`
  - This will make the app use the locally running server
- Make changes **according** to the Tasks assigned to you
- Maintain the folder structure , keep small components like **Navbar, Home** in `src\components` folder
- We have used **Material UI & Styled Components** for styling, Styling files are available in `[component]\styles.js`.
- You are also allowed to use GOOGLE FONTS for same fonts as of figma files.
- Other extra **Pictures, icons , svgs** are to be kept in `src\images\`
- Once you are done with the changes , `cd ..` to come to the root folder
- Once all server related changes are done locally 
  - Reset the index of the array from `const API = axios.create({ baseURL: apiURL[1] })` to `...apiURL[0]...` to reuse the deployed server
- `git pull` to pull the latest version of the code
- `git add .` to stage for commits
- `git commit -am "message"` for commiting the code.
- **REMEMBER** --> YOU NEED TO PULL REQ ON `main` BRANCH !!
- Once done create a Pull Request and wait for the repo-owner to review.
- Attach proper **`Screenshots, Proper Description and Issue Number` in the Pull request**
- Dont forget to ⭐ the repository on github
<br/>

## For moderators
- Before merging a PR with big changes.
- `git branch -b <newBranch-name>`
- `git fetch origin refs/pull/#PR_number/head:<newBranch-name>`
- `git checkout <newBranch-name>`
- Do testing with `npm start`
- Approve or Review changes in PR accordingly
- References [Stack Overflow Link](https://stackoverflow.com/questions/14947789/github-clone-from-pull-request)
