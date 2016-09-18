import _ from 'lodash';

/*
 * This is a helper module to simply creater action constants and creator methods.
 * "Generating Action Creators" -> http://redux.js.org/docs/recipes/ReducingBoilerplate.html
 *
 * The method returns an object:
 *
 * ```
 * {
 *   type: 'TYPE_NAME',   // --> If action is not a async action.
 *   create: function() { ... }
 * }
 * ```
 *
 * or, if the first parameter is a function, it just returns an object with the create function.
 *  --> For async actions- > See http://redux.js.org/docs/advanced/AsyncActions.html
 *
 * @param type STRING || FUNCTION
 * @param argnames If type is a String these are the values of the action's payload.
 */
export default function(type, ...argnames) {
  if (_.isFunction(type)) {
    return {
      create: type
    };
  } else {
    return {
      type: type,
      create: function(...args) {
        let action = {
          type
        }

        argnames.forEach((arg, index) => {
          action[argnames[index]] = args[index]
        })

        return action;
      }
    }
  }
}
