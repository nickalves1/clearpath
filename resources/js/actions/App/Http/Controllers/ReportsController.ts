import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ReportsController::sign
 * @see app/Http/Controllers/ReportsController.php:0
 * @route '/api/imaging-reports/{report}/sign'
 */
export const sign = (args: { report: string | number } | [report: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sign.url(args, options),
    method: 'post',
})

sign.definition = {
    methods: ["post"],
    url: '/api/imaging-reports/{report}/sign',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ReportsController::sign
 * @see app/Http/Controllers/ReportsController.php:0
 * @route '/api/imaging-reports/{report}/sign'
 */
sign.url = (args: { report: string | number } | [report: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { report: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    report: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        report: args.report,
                }

    return sign.definition.url
            .replace('{report}', parsedArgs.report.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReportsController::sign
 * @see app/Http/Controllers/ReportsController.php:0
 * @route '/api/imaging-reports/{report}/sign'
 */
sign.post = (args: { report: string | number } | [report: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sign.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ReportsController::sign
 * @see app/Http/Controllers/ReportsController.php:0
 * @route '/api/imaging-reports/{report}/sign'
 */
    const signForm = (args: { report: string | number } | [report: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: sign.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ReportsController::sign
 * @see app/Http/Controllers/ReportsController.php:0
 * @route '/api/imaging-reports/{report}/sign'
 */
        signForm.post = (args: { report: string | number } | [report: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: sign.url(args, options),
            method: 'post',
        })
    
    sign.form = signForm
const ReportsController = { sign }

export default ReportsController