---
title: Deploying With Dokku on Digital Ocean Part 1
publish: draft
---

# Deploying With Dokku on Digital Ocean

Artists have sketchbooks. Writers have notebooks. Actors have rehearsals. Developers have deployment environments!

Not one to roll my own solutions too often (ha!) I finally felt compelled to setup a mini [Heroku][heroku] alternative for myself.

Before reading further it will help to have an understanding of [Git](git) for managing source code.

## Why Not Heroku?

[Heroku][heroku] is awesome. The workflow is ideal for putting something on the internet no matter what coding language or tech stack you're using. It came in really handy when we used it to deploy [The Punboard][punboard] for the [Fall Comedy Hack Day](comedy-hack-day) event.

The main ingredients for deploying to Heroku are:

### Procfile

This file instructs Heroku on what to run once your code is deployed.

```
web: node index.js
```

Where `web` is the name of the process so you can later monitor it in Heroku's dashboards. `node index.js` is the command to kick off your actual process - like a web server. In this case we're running a simple Javascript file in a [node.js][node] environment.

### Git Remote

A Heroku deployment is a simple `git push` operation. It's a way of sending just the updated code to Heroku's servers.

```
git remote add heroku {heroku address}
git push heroku
```

There is more you can do and configure beyond this, but the workflow now is simply `git push heroku` and Heroku will run the
`web` process after receiving the updates from `git push`.

## Enter Dokku

While the Heroku workflow is brilliant there are aspects about the service that I can live without.

Price wise Heroku is pretty solid if you're deploying simple apps. You really only start to pay when you need to scale a single app which is a whole other discussion. So while you can run a free instance per app if your app has low traffic Heroku will idle. This prevents users from accessing your app while Heroku spins up a new instance on new traffic. There are hacks around this like [setting up Pingdom](pingdom) to make a request against your app every minute, but I don't want to set stuff like this up for small test projects.

I've been geeking out on Docker lately which surfaced this neat tool called Dokku. Dokku pitches itself as "Docker powered mini-Heroku in around 100 lines of Bash". That sounds like a wonderful alternative to me!

## Enter Digital Ocean

With Dokku in mind I need somewhere to act as a host for Dokku. [Digital Ocean](digital-ocean) is a cloud hosting provider that offers dead simple base images - which are like templates for operating systems - one of which comes with Dokku already installed. In less than 5 minutes you can spin up a small server  with Dokku already installed for $5 a month which is super cheap compared to other hosting providers.

## Now What?

I think the concept of a Heroku workflow (which is commonly referred to as [PaaS or Platform as a Service](paas)) can be difficult to grok for new dev so I'm breaking this up in to two parts. Hopefully this article is a good introduction to alternative tools that help facilitate a Heroku workflow. In a follow up I'll go in to the actual implementation!

In the meantime you might want to try [setting up a sample app on Heroku](heroku-getting-started) to get a feel for the workflow before rolling you're own hosted solution.


[heroku]: https://www.heroku.com (Heroku)
[comedy-hack-day]: http://www.comedyhackday.org/sf-2014/ (Comedy Hack Day SF 2014)
[node]: http://nodejs.org (node.js)
[git]: http://git-scm.com/book/en/v2/Getting-Started-About-Version-Control (Git SCM - Getting Started)
[punboard]: http://thepunboard.com (The Punboard)
[pingdom]: http://stackoverflow.com/questions/5480337/easy-way-to-prevent-heroku-idling (Stackoverflow - Heroku Idling)
[dokku]: http://progrium.viewdocs.io/dokku/index (Dokku Docs)
[digital-ocean]: https://www.digitalocean.com (Digital Ocean)
[paas]: http://en.wikipedia.org/wiki/Platform_as_a_service (Wikipedia - Platform as a Service)
[heroku-getting-started]: https://devcenter.heroku.com/start (Heroku - Getting Started)

# Notes

- Reference different environments/technologies and how Heroku auto detects them.
- Benefit is it's simple, but it aint cheap and they auto shutdown processes.
