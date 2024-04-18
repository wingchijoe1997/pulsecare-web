<!--! Replace `pulsecare-web`, `project_title`, `project_description`,`technology`-->

<a name="readme-top"></a>

<div align="center">

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

[![Board Status](https://dev.azure.com/PulseCare/d55b5928-e8a7-4d31-b0c7-13bdac9ebeb2/99225186-8cd9-4f4e-bf74-83afa61c68e6/_apis/work/boardbadge/24387b5d-8911-4219-abfd-9047233756d5?columnOptions=1)](https://dev.azure.com/PulseCare/d55b5928-e8a7-4d31-b0c7-13bdac9ebeb2/_boards/board/t/99225186-8cd9-4f4e-bf74-83afa61c68e6/Stories/)

</div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/CC-Comp308001-Group04/pulsecare-web">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">PulseCare</h3>

  <p align="center">
    PulseCare is the app that connects patients with nurses and provides a platform for them to communicate and share information.
    <br />
    <a href="https://github.com/CC-Comp308001-Group04/pulsecare-web"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/CC-Comp308001-Group04/pulsecare-web">View Demo</a>
    ·
    <a href="https://github.com/CC-Comp308001-Group04/pulsecare-web/issues">Report Bug</a>
    ·
    <a href="https://github.com/CC-Comp308001-Group04/pulsecare-web/issues">Request Feature</a>
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
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

<p align="right">><a href="#readme-top">TOP</a><</p>

### Built With

[![Next][Next.js]][Next-url][![MongoDB][MongoDB]][MongoDB-url][![Prisma][Prisma]][Prisma-url][![Docker][Docker]][Docker-url][![Azure][Azure]][Azure-url]

<p align="right">><a href="#readme-top">TOP</a><</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

```sh
npm install pnpm@latest -g
```

Docker is strongly recommended.

Get MongodDB Atlas connection string:

- Get Added to the project by the owner (@DavDeDev, @wingchijoe1997)
- Go to the project and click on the "Connect" button
- Copy the connection string

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/CC-Comp308001-Group04/pulsecare-web.git && cd pulsecare-web
   ```
2. Install NPM packages

   ```sh
   pnpm install
   ```

3. Install Dotenv CLI

   ```sh
   pnpm i -g dotenv-cli
   ```

4. Create a `.env.local` file from the `.env.local.template` and fill in the required information
   ```sh
   cp .env.local.template .env.local
   ```

#### With Docker

Make sure Docker deamon is running.

To Build and run services:

```sh
docker compose -f ./docker/docker-compose.yaml -p pulsecare-web --profile dev up --build -d -V
```

When you are done developing, you can stop and remove the containers::

```sh
docker compose -p pulsecare-web down -v
```

#### Without Docker

Make sure you have MongoDB Atlas connection string.

Place the connection string in the `.env.local` file:

```js
DATABASE_URL =
  "mongodb+srv://<username>:<password>@<cluster>.ab1cde2.mongodb.net/?retryWrites=true&w=majority&appName=cluster";
```

Run the app:

```sh
pnpm dev || npm run dev
```

> [!CAUTION]
> No, MongoDB Local DB is NOT enough for development. You will need to use either a Local MongodDB Cluster, MongoDB Atlas or run Docker Container provided. [Learn why](https://github.com/prisma/prisma/issues/8266#issue-944237913)

<p align="right">><a href="#readme-top">TOP</a><</p>

<!-- USAGE EXAMPLES -->

## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">><a href="#readme-top">TOP</a><</p>

<!-- CONTACT -->

## Contact

David Pietrocola - pietrocoladavid@gmail.com - [LinkedIn](https://www.linkedin.com/in/pietrocoladavid)

<p align="right">><a href="#readme-top">TOP</a><</p>

[contributors-shield]: https://img.shields.io/github/contributors/CC-Comp308001-Group04/pulsecare-web.svg?style=for-the-badge
[contributors-url]: https://github.com/CC-Comp308001-Group04/pulsecare-web/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/CC-Comp308001-Group04/pulsecare-web.svg?style=for-the-badge
[forks-url]: https://github.com/CC-Comp308001-Group04/pulsecare-web/network/members
[stars-shield]: https://img.shields.io/github/stars/CC-Comp308001-Group04/pulsecare-web.svg?style=for-the-badge
[stars-url]: https://github.com/CC-Comp308001-Group04/pulsecare-web/stargazers
[issues-shield]: https://img.shields.io/github/issues/CC-Comp308001-Group04/pulsecare-web.svg?style=for-the-badge
[issues-url]: https://github.com/CC-Comp308001-Group04/pulsecare-web/issues
[license-shield]: https://img.shields.io/github/license/CC-Comp308001-Group04/pulsecare-web.svg?style=for-the-badge
[license-url]: https://github.com/CC-Comp308001-Group04/pulsecare-web/blob/master/LICENSE.md
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/pietrocoladavid
[product-screenshot]: images/screenshot.png

<!-- !Use this as a template to add technologies -->

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[MongoDB]: https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[Prisma]: https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white
[Prisma-url]: https://www.prisma.io/
[Docker]: https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/
[Azure]: https://img.shields.io/badge/Microsoft_Azure-0089D6?style=for-the-badge&logo=microsoft-azure&logoColor=white
[Azure-url]: https://azure.microsoft.com/
