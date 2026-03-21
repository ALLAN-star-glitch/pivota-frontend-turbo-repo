import type { PlopTypes } from '@turbo/gen'
 
export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator('component', {
    description: 'Create a new UI component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name (e.g., Input):',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'packages/ui/src/{{kebabCase name}}.tsx',
        templateFile: 'templates/component.hbs',
      },
      {
        type: 'add',
        path: 'packages/ui/src/{{kebabCase name}}.test.tsx',
        templateFile: 'templates/component-test.hbs',
      },
      {
        type: 'append',
        path: 'packages/ui/src/index.ts',
        template: "export * from './{{kebabCase name}}'",
      },
    ],
  })
}