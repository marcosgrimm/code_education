<?php

namespace CodeProject\Entities;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $fillable = [
        'name',
        'responsible',
        'phone',
        'email',
        'address',
        'obs',
    ];



    public function projects(){
        return $this->hasMany(Project::class);
    }
}
