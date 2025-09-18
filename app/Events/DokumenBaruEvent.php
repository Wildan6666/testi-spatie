<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use app\Models\ProdukHukum;

class DokumenBaruEvent implements ShouldBroadcast
{
    public $dokumen;

    public function __construct(ProdukHukum $dokumen)
    {
        $this->dokumen = $dokumen;
    }

    public function broadcastOn()
    {
        return new Channel('dokumen-channel');
    }

    public function broadcastAs()
    {
        return 'dokumen-baru';
    }

}
