# Creating new Angular Application

```ng new tde-mobile```

Creates new Angular application under `tde-mobile` directory

# The `app-root` Component

The src/index.html contains new html `tag` called `app-root`

In Angular we can define our own
HTML tags and give them custom functionality. The `app-root` tag will be the “entry
point” for our application on the page

# Angular CLI
``` npm install -g @angular/cli```

# Running the application
Angular CLI has a built in HTTP server that we can use to run our app

```ng serve```

application is now running on localhost port 4200. Let’s open the browser and
visit:

http://localhost:4200

By default, angular will use port 4200. If for any reason you want to specify another port
you can do that with `--port` flag.

`ng serve --port 9001`

http://localhost:9001

# Angular Components

The fundamental idea behind components: teach the browser new
tags that have custom functionality attached to them

## Creating component

`ng generate component hello-world`

This will generate new component under `src/app/hello-world/` directory.

## Component parts

The main parts of the component are:

1. A Component decorator
2. A component definition class
3. A Component template definition
4. A Component style definition
5. A Component selector

### Component decorator

```ts
 @Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.css']
})
export class HelloWorldComponent implements OnInit {}
```

To specify a class to be Angular component, `@Component` decorator is added on top of a class.

The decorator are TypeScript functions that add metadata about a class.

In Angular components, metadata that we add are:

1. `selector`
    Defines new html tag that is used in markup
2. `templateUrl`
    Defines a markup for a component
3. `styleUrls`
    Defines a style that's used in a markup
