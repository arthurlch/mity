<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/arthurlch/nitii">
    <img src="https://i.imgur.com/H2oBXUf.png" alt="Logo" width="150" height="150">
  </a>

<h3 align="center">Nitii</h3>

  <p align="center">
    project_description
    <br />
    <a href="https://github.com/github_username/repo_name"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/github_username/repo_name">View Demo</a>
    ·
    <a href="https://github.com/github_username/repo_name/issues">Report Bug</a>
    ·
    <a href="https://github.com/github_username/repo_name/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Nitti is a TS framework for studies and personal use.
Heavily inspired by Stephen Grider course and Minko Gechev, Marvin Frachet.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [Typescript](https://www.typescriptlang.org/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

git clone https://github.com/arthurlch/nitii.git

### Prerequisites

Node 14 ~
Typescript 7 ~

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/arthurlch/nitii.git
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

Niiti is based on a View Model pattern.

### Model

#### Eventing

Eventing.ts contain basics event:

**on.(eventName, callback)**

```
user.on('change', () => {
  console.log('user change')
})
```

**trigger(eventName)**

trigger on.('change') wil trigger event defined above

```
user.trigger('change);

// 'user change'
```

#### ApiSync

ApiSync.ts contain all the Sync properties available.

**fetch(id): Promise**

```
let userId = 1;
user.fetch(userId);

// return axios.get(`${this.url}/${id}`)
```

**save()**

```
const user = New User({id: 1, name: 'user'});

user.on('save', () => {
  console.log(user)
});
user.save();

```

#### Attributes

Basic attributes to retrieve data and modify data.

**get(target)**

```
user = New User({id: 1, name: 'test'});
user.get('name');

// 'test'
```

**set(updateTarget)**

```
user = New User({id: 1, name: 'test'});

uset.set({name: 'newName'});
```

**getAll()**

```
user = New User({id: 1, name: 'test'});

user.getAll();

// shows User model Object with attributes etc
```

#### Collection

Collection objects provide a method of storing and retrieving items in memory based upon a key in a data structure that stores pairs of keys and values.

ex:

```
const myUrl = 'http://localhost:3000/users'
const collection = New Collection(myUrl);

collection.on('change', () => {
console.log(collection);
});

collection.fetch();

// Collection(events, attributes, models[array that contain all users or model])
```

#### User Model

Niiti provide default model 'Model.ts' which other model will inherit.

A user model is also provided

```
import { Model } from './Model';
import { Attributes } from './Attributes';
import { ApiSync } from './ApiSync';
import { Eventing } from './Eventing';
import { Collection } from './Collection';

// init and interface to customize your Model
export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

// set your development/prod url.
const rootUrl = 'http://localhost:3000/users';

// init user class
export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new ApiSync<UserProps>(rootUrl)
    );
  }

  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(rootUrl, (json: UserProps) =>
      User.buildUser(json)
    );
  }

  // you customize the User model adding new functionnality here
  setRandomAge(): void {
    const age = Math.round(Math.random() * 100);
    this.set({ age });
  }
}
```

### Views

A view is a callable which takes a request and returns a response. This can be more than just a function. These allow you to structure your views and reuse code by harnessing inheritance and mixins.

The particularity here is that we don't use a parser to parse the HTML so any html rendering will be done with backticks ``. ( HTML Parser might be in the roadmap).

Rendering is done with HTMLTemplateElement
see the doc here: https://developer.mozilla.org/en-US/docs/Web/API/HTMLTemplateElement

In the case of User model to render it, there is 3 sections.
UserEdit that contain UserForm and UserShow and will render both files.

You can add new Views nesting it in UserEdit or you own view depending the model you want to render.

An example with UserShow.ts

**UserShow.ts**

```
export class UserShow extends View<User, UserProps> {
  template(): string {
    return `
      <div>
      // Your html here
      </div>
    `;
  }
}
```

UserShow will be rendered from UserEdit.

**UserForm**

UserForm is were you should render forms that needs events like button click etc.

Event bindings happends in a eventsMapper.

```
eventsMap(): { [key: string]: () => void } {
    return {
      'click:.save-model': this.onSaveClick,
    };
}
```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/arthurlch/nitii/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Please do not open PR.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Arthur - [@twitter_handle](https://twitter.com/arthurlch)
Project Link: [https://github.com/arthurlch/nitii](https://github.com/arthurlch/nitii)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [Stephen Grider](https://github.com/StephenGrider)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
