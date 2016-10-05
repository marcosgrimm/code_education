<?php

namespace CodeProject\Http\Middleware;

use Closure;
use CodeProject\Repositories\ProjectRepository;
use LucaDegasperi\OAuth2Server\Authorizer;

class CheckProjectOwner
{
    private $repository;

    public function __construct(ProjectRepository $repository)
    {
        $this->repository =$repository;

    }


    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        $owner_id = \Authorizer::getResourceOwnerId();
        $project_id = $request->project;

        if ($this->repository->isOwner($project_id,$owner_id) == false){
            return ['erro'=>'Access Forbidden'];
        }

        return $next($request);
    }
}
