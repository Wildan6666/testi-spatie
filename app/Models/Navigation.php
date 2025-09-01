<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Navigation extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'url', 'parent_id', 'sort', 'icon'];

    public function children()
    {
        return $this->hasMany(Navigation::class, 'parent_id')->orderBy('sort');
    }

    public function parent()
    {
        return $this->belongsTo(Navigation::class, 'parent_id');
    }
    public function permissions()
    {
        return $this->hasMany(\Spatie\Permission\Models\Permission::class, 'menu_id');
    }

}


