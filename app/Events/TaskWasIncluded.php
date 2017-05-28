<?php

namespace CodeProject\Events;

use CodeProject\Entities\ProjectTask;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;
use LucaDegasperi\OAuth2Server\Facades\Authorizer;


class TaskWasIncluded extends Event implements ShouldBroadcast {

    use SerializesModels;

    public $task;

    public function __construct(ProjectTask $task)
    {
        $this->task = $task;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return ['user.'.\Authorizer::getResourceOwnerId()];
    }
}