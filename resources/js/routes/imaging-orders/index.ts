import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\ImagingOrdersController::index
 * @see app/Http/Controllers/ImagingOrdersController.php:14
 * @route '/api/imaging-orders'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/imaging-orders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ImagingOrdersController::index
 * @see app/Http/Controllers/ImagingOrdersController.php:14
 * @route '/api/imaging-orders'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImagingOrdersController::index
 * @see app/Http/Controllers/ImagingOrdersController.php:14
 * @route '/api/imaging-orders'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ImagingOrdersController::index
 * @see app/Http/Controllers/ImagingOrdersController.php:14
 * @route '/api/imaging-orders'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ImagingOrdersController::index
 * @see app/Http/Controllers/ImagingOrdersController.php:14
 * @route '/api/imaging-orders'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ImagingOrdersController::index
 * @see app/Http/Controllers/ImagingOrdersController.php:14
 * @route '/api/imaging-orders'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ImagingOrdersController::index
 * @see app/Http/Controllers/ImagingOrdersController.php:14
 * @route '/api/imaging-orders'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\ImagingOrdersController::store
 * @see app/Http/Controllers/ImagingOrdersController.php:30
 * @route '/api/imaging-orders'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/imaging-orders',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ImagingOrdersController::store
 * @see app/Http/Controllers/ImagingOrdersController.php:30
 * @route '/api/imaging-orders'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImagingOrdersController::store
 * @see app/Http/Controllers/ImagingOrdersController.php:30
 * @route '/api/imaging-orders'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ImagingOrdersController::store
 * @see app/Http/Controllers/ImagingOrdersController.php:30
 * @route '/api/imaging-orders'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ImagingOrdersController::store
 * @see app/Http/Controllers/ImagingOrdersController.php:30
 * @route '/api/imaging-orders'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\ImagingOrdersController::show
 * @see app/Http/Controllers/ImagingOrdersController.php:38
 * @route '/api/imaging-orders/{imaging_order}'
 */
export const show = (args: { imaging_order: string | number } | [imaging_order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/imaging-orders/{imaging_order}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ImagingOrdersController::show
 * @see app/Http/Controllers/ImagingOrdersController.php:38
 * @route '/api/imaging-orders/{imaging_order}'
 */
show.url = (args: { imaging_order: string | number } | [imaging_order: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { imaging_order: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    imaging_order: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        imaging_order: args.imaging_order,
                }

    return show.definition.url
            .replace('{imaging_order}', parsedArgs.imaging_order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImagingOrdersController::show
 * @see app/Http/Controllers/ImagingOrdersController.php:38
 * @route '/api/imaging-orders/{imaging_order}'
 */
show.get = (args: { imaging_order: string | number } | [imaging_order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ImagingOrdersController::show
 * @see app/Http/Controllers/ImagingOrdersController.php:38
 * @route '/api/imaging-orders/{imaging_order}'
 */
show.head = (args: { imaging_order: string | number } | [imaging_order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ImagingOrdersController::show
 * @see app/Http/Controllers/ImagingOrdersController.php:38
 * @route '/api/imaging-orders/{imaging_order}'
 */
    const showForm = (args: { imaging_order: string | number } | [imaging_order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ImagingOrdersController::show
 * @see app/Http/Controllers/ImagingOrdersController.php:38
 * @route '/api/imaging-orders/{imaging_order}'
 */
        showForm.get = (args: { imaging_order: string | number } | [imaging_order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ImagingOrdersController::show
 * @see app/Http/Controllers/ImagingOrdersController.php:38
 * @route '/api/imaging-orders/{imaging_order}'
 */
        showForm.head = (args: { imaging_order: string | number } | [imaging_order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\ImagingOrdersController::update
 * @see app/Http/Controllers/ImagingOrdersController.php:54
 * @route '/api/imaging-orders/{imaging_order}'
 */
export const update = (args: { imaging_order: string | number } | [imaging_order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/imaging-orders/{imaging_order}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\ImagingOrdersController::update
 * @see app/Http/Controllers/ImagingOrdersController.php:54
 * @route '/api/imaging-orders/{imaging_order}'
 */
update.url = (args: { imaging_order: string | number } | [imaging_order: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { imaging_order: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    imaging_order: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        imaging_order: args.imaging_order,
                }

    return update.definition.url
            .replace('{imaging_order}', parsedArgs.imaging_order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImagingOrdersController::update
 * @see app/Http/Controllers/ImagingOrdersController.php:54
 * @route '/api/imaging-orders/{imaging_order}'
 */
update.put = (args: { imaging_order: string | number } | [imaging_order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\ImagingOrdersController::update
 * @see app/Http/Controllers/ImagingOrdersController.php:54
 * @route '/api/imaging-orders/{imaging_order}'
 */
update.patch = (args: { imaging_order: string | number } | [imaging_order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\ImagingOrdersController::update
 * @see app/Http/Controllers/ImagingOrdersController.php:54
 * @route '/api/imaging-orders/{imaging_order}'
 */
    const updateForm = (args: { imaging_order: string | number } | [imaging_order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ImagingOrdersController::update
 * @see app/Http/Controllers/ImagingOrdersController.php:54
 * @route '/api/imaging-orders/{imaging_order}'
 */
        updateForm.put = (args: { imaging_order: string | number } | [imaging_order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\ImagingOrdersController::update
 * @see app/Http/Controllers/ImagingOrdersController.php:54
 * @route '/api/imaging-orders/{imaging_order}'
 */
        updateForm.patch = (args: { imaging_order: string | number } | [imaging_order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\ImagingOrdersController::destroy
 * @see app/Http/Controllers/ImagingOrdersController.php:62
 * @route '/api/imaging-orders/{imaging_order}'
 */
export const destroy = (args: { imaging_order: string | number } | [imaging_order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/imaging-orders/{imaging_order}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ImagingOrdersController::destroy
 * @see app/Http/Controllers/ImagingOrdersController.php:62
 * @route '/api/imaging-orders/{imaging_order}'
 */
destroy.url = (args: { imaging_order: string | number } | [imaging_order: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { imaging_order: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    imaging_order: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        imaging_order: args.imaging_order,
                }

    return destroy.definition.url
            .replace('{imaging_order}', parsedArgs.imaging_order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImagingOrdersController::destroy
 * @see app/Http/Controllers/ImagingOrdersController.php:62
 * @route '/api/imaging-orders/{imaging_order}'
 */
destroy.delete = (args: { imaging_order: string | number } | [imaging_order: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\ImagingOrdersController::destroy
 * @see app/Http/Controllers/ImagingOrdersController.php:62
 * @route '/api/imaging-orders/{imaging_order}'
 */
    const destroyForm = (args: { imaging_order: string | number } | [imaging_order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ImagingOrdersController::destroy
 * @see app/Http/Controllers/ImagingOrdersController.php:62
 * @route '/api/imaging-orders/{imaging_order}'
 */
        destroyForm.delete = (args: { imaging_order: string | number } | [imaging_order: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const imagingOrders = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
show: Object.assign(show, show),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default imagingOrders